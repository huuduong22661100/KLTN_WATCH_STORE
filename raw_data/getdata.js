// getdata.js
const { Builder, Browser, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");

// Load categories and colors mappings
let categoriesMapping = {};
let colorsMapping = {};

try {
    const categoriesData = JSON.parse(fs.readFileSync("../root_laptops/backend/src/data/categories_id.json", "utf-8"));
    categoriesData.forEach(cat => {
        categoriesMapping[cat.category.toLowerCase().trim()] = cat._id;
    });
} catch (e) {
    console.error("⚠️ Không thể đọc file categories_id.json:", e.message);
}

try {
    const colorsData = JSON.parse(fs.readFileSync("../root_laptops/backend/src/data/colors_id.json", "utf-8"));
    colorsData.forEach(color => {
        colorsMapping[color.color.toLowerCase().trim()] = color._id;
    });
} catch (e) {
    console.error("⚠️ Không thể đọc file colors_id.json:", e.message);
}

/**
 * Hàm chuyển đổi tên category thành object _id
 * @param {string} categoryName - Tên category (có thể chứa nhiều giá trị cách nhau bởi dấu phẩy)
 * @returns {object|null} Object _id: { "$oid": "..." } hoặc null nếu không tìm thấy
 */
function getCategoryId(categoryName) {
    // Lấy giá trị đầu tiên nếu có nhiều giá trị cách nhau bởi dấu phẩy
    const firstCategory = categoryName.split(',')[0].trim();
    const normalized = firstCategory.toLowerCase().trim();
    return categoriesMapping[normalized] || null;
}

/**
 * Hàm chuyển đổi tên color thành object _id
 * @param {string} colorName - Tên color (có thể là "Đen, Vàng" hoặc "Đen")
 * @returns {object|null} Object _id: { "$oid": "..." } hoặc null nếu không tìm thấy
 */
function getColorId(colorName) {
    // Lấy màu đầu tiên nếu có nhiều màu cách nhau bởi dấu phẩy
    const firstColor = colorName.split(',')[0].trim();
    const normalized = firstColor.toLowerCase().trim();
    return colorsMapping[normalized] || null;
}

/**
 * Hàm chuẩn hóa text thành key JSON (snake_case).
 * @param {string} key - Chuỗi cần chuẩn hóa.
 * @returns {string} Chuỗi đã được chuẩn hóa.
 */
function normalizeKey(key) {
    return key
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");
}

/**
 * Hàm dịch các key từ tiếng Việt sang tiếng Anh.
 * @param {string} key - Key tiếng Việt.
 * @returns {string|null} Key tiếng Anh đã được dịch hoặc null nếu không tìm thấy.
 */
function translateKey(key) {
    const translations = {
        "máy": "movement",
        "vật liệu vỏ và gờ": "case_bezel_material",
        "kích thước": "size",
        "độ dày": "thickness",
        "trọng lượng": "weight",
        "giới tính": "gender",
        "xuất xứ": "origin",
        "biến thể màu": "color_variation",
        "biến thể dây đeo": "band_variation",
        "chất liệu mặt kính": "glass_material",
        "mức độ chống nước": "water_resistance_level",
        "hình dạng mặt": "dial_shape"
    };
    const normalizedKey = normalizeKey(key);
    for (const [vietnameseKey, englishKey] of Object.entries(translations)) {
        if (normalizeKey(vietnameseKey) === normalizedKey) {
            return englishKey;
        }
    }
    return null;
}

(async function scrapeWatchDetails() {
    const options = new chrome.Options();
    options.addArguments("--ignore-certificate-errors", "--ignore-ssl-errors");

    const driver = await new Builder()
        .forBrowser(Browser.CHROME)
        .setChromeOptions(options)
        .build();

    try {
        const allLinks = JSON.parse(fs.readFileSync("links.json", "utf-8"));
        const linksToScrape = allLinks.slice(0, 120);

        let existingData = [];
        try {
            if (fs.existsSync("details.json")) {
                const fileContent = fs.readFileSync("details.json", "utf-8");
                if (fileContent.trim() !== "") {
                    existingData = JSON.parse(fileContent);
                }
            }
        } catch (e) {
            console.error("⚠️ Lỗi khi đọc file details.json, sẽ bắt đầu ghi lại từ đầu.");
            existingData = [];
        }

        let index = existingData.length;
        for (const link of linksToScrape) {
            index++;
            console.log(`👉 Đang xử lý: ${link}`);

            await driver.get(link);
            await driver.sleep(3000);

            let product = {
                id: index,
                categories_id: [],
                color_id: null,
            };

            // --- Lấy SKU, danh mục và color từ product meta ---
            try {
                const productMeta = await driver.findElement(By.css('.product_meta'));
                
                // Lấy categories
                try {
                    const cats = await productMeta.findElements(By.css(".posted_in a"));
                    for (const cat of cats) {
                        const categoryName = await cat.getText();
                        const categoryId = getCategoryId(categoryName);
                        if (categoryId !== null) {
                            product.categories_id.push(categoryId);
                        } else {
                            console.log(`⚠️ Không tìm thấy ID cho category: ${categoryName}`);
                        }
                    }
                } catch { }
            } catch {
                console.log("⚠️ Không tìm thấy product meta.");
            }

            // --- Lấy color từ specifications ---
            try {
                const specsTable = await driver.findElement(By.css('.woocommerce-product-attributes.shop_attributes'));
                const rows = await specsTable.findElements(By.css('tr'));
                
                for (const row of rows) {
                    try {
                        const keyEl = await row.findElement(By.css('th'));
                        const key = await keyEl.getText();
                        
                        if (normalizeKey(key) === normalizeKey("Biến thể màu")) {
                            const valueEl = await row.findElement(By.css('td p a, td'));
                            const colorName = await valueEl.getText();
                            const colorId = getColorId(colorName);
                            if (colorId !== null) {
                                product.color_id = colorId;
                            } else {
                                console.log(`⚠️ Không tìm thấy ID cho color: ${colorName}`);
                            }
                            break;
                        }
                    } catch { }
                }
            } catch {
                console.log("⚠️ Không tìm thấy bảng specifications.");
            }

            existingData.push(product);
            fs.writeFileSync("details.json", JSON.stringify(existingData, null, 2), "utf-8");
            console.log(`✅ Đã lưu sản phẩm: ${product.title}`);
        }
    } catch (err) {
        console.error("❌ Lỗi nghiêm trọng:", err);
    } finally {
        await driver.quit();
        console.log("✨ Hoàn tất quá trình cào dữ liệu.");
    }
})();