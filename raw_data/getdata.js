// getdata.js
const { Builder, Browser, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");

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
                title: null,
                description: [],
                images: { mainImg: null, sliderImg: [] },
                price: null,
                brand: null,
                sku: null,
                categories: [],
                tags: [],
                gender: null,
                origin: null,
                color_variation: null,
                specifications: {},
            };

            // --- Lấy tên sản phẩm, giá và ảnh ---
            try {
                const titleEl = await driver.wait(until.elementLocated(By.css(".product-title-container h1")), 8000);
                product.title = await titleEl.getText();
            } catch {
                console.log("⚠️ Không tìm thấy tiêu đề.");
            }

            try {
                const priceEl = await driver.findElement(By.css(".price.product-page-price"));
                const priceText = await priceEl.getText();
                product.price = parseInt(priceText.replace(/[^0-9]/g, ""));
            } catch {
                console.log("⚠️ Không có giá.");
            }

            try {
                const mainImgEl = await driver.findElement(By.css(".woocommerce-product-gallery__image img.wp-post-image"));
                const mainSrc = await mainImgEl.getAttribute("src");
                product.images.mainImg = { url: mainSrc, alt_text: "main" };

                const sliderImgEls = await driver.findElements(By.css(".woocommerce-product-gallery__image:not(:first-child) img"));
                for (const imgEl of sliderImgEls) {
                    const src = await imgEl.getAttribute("src");
                    product.images.sliderImg.push({ url: src, alt_text: "slide" });
                }
            } catch {
                console.log("⚠️ Không tìm thấy ảnh.");
            }
            
            // --- Cào tất cả các khối nội dung, mô tả và thông số kỹ thuật ---
            try {
                const allContentBlocks = await driver.findElements(By.css('#tab_mô-tả-sản-phẩm > p, .container.margin-bottom-2.aem-GridColumn--default--none, .p-product_detail-spec-accordion__item, .p-product_detail-spec-table, .woocommerce-product-attributes.shop_attributes'));

                for (const block of allContentBlocks) {
                    const blockClass = await block.getAttribute('class');

                    if (blockClass.includes('p-product_detail-spec-accordion__item')) {
                        const titleEl = await block.findElement(By.css(".p-product_detail-spec-accordion__title"));
                        const title = await titleEl.getText();
                        const listItems = await block.findElements(By.css(".p-product_detail-spec-accordion__panel-item"));

                        if (listItems.length > 0) {
                            let descriptionHtml = "";
                            for (const li of listItems) {
                                const keyEl = await li.findElement(By.css(".p-product_detail-spec-accordion__panel-item-ttl h4"));
                                const valueElements = await li.findElements(By.css(".p-product_detail-spec-accordion__panel-item-cont"));

                                const key = await keyEl.getText();
                                let valueText = "";
                                for (const valEl of valueElements) {
                                    valueText += await valEl.getText() + " ";
                                }

                                const translatedKey = translateKey(key);
                                if (translatedKey) {
                                    product.specifications[translatedKey] = valueText.trim();
                                }
                                descriptionHtml += `<li><h4>${key}</h4><div>${valueText.trim()}</div></li>`;
                            }
                            product.description.push({
                                title: title,
                                description: `<ul>${descriptionHtml}</ul>`,
                                img: null
                            });
                        } else {
                            const content = await block.findElement(By.css(".p-product_detail-spec-accordion__panel")).getText();
                            if (content.trim() !== "") {
                                product.description.push({
                                    title: title,
                                    description: content.trim(),
                                    img: null
                                });
                            }
                        }
                    } else if (blockClass.includes('p-product_detail-spec-table')) {
                        const rows = await block.findElements(By.css('tr'));
                        for (const row of rows) {
                            const cells = await row.findElements(By.css('th, td'));
                            if (cells.length === 2) {
                                const key = await cells[0].getText();
                                const value = await cells[1].getText();
                                const translatedKey = translateKey(key);
                                if (translatedKey) {
                                    product.specifications[translatedKey] = value;
                                }
                            }
                        }
                    } else if (blockClass.includes('woocommerce-product-attributes')) {
                        const rows = await block.findElements(By.css('tr'));
                        for (const row of rows) {
                            const keyEl = await row.findElement(By.css('th'));
                            const valueEl = await row.findElement(By.css('td p a, td'));
                            const key = await keyEl.getText();
                            const value = await valueEl.getText();
                            const translatedKey = translateKey(key);
                            if (translatedKey) {
                                if (value.trim() !== "") {
                                    product.specifications[translatedKey] = value.trim();
                                }
                            }
                        }
                    } else if (await block.getTagName() === 'p') {
                        const descriptionText = await block.getText();
                        if (descriptionText.trim() !== "") {
                            product.description.push({
                                title: "Mô tả sản phẩm",
                                description: descriptionText.trim(),
                                img: null,
                            });
                        }
                    }
                }
            } catch (e) {
                console.log("⚠️ Lỗi khi cào các khối nội dung:", e.message);
            }

            // --- Lấy SKU, danh mục và tags từ product meta ---
            try {
                const productMeta = await driver.findElement(By.css('.product_meta'));
                try {
                    const skuEl = await productMeta.findElement(By.css(".sku"));
                    product.sku = await skuEl.getText();
                } catch { }
                try {
                    const cats = await productMeta.findElements(By.css(".posted_in a"));
                    for (const cat of cats) {
                        product.categories.push(await cat.getText());
                    }
                } catch { }
                try {
                    const tags = await productMeta.findElements(By.css(".tagged_as a"));
                    for (const tag of tags) {
                        product.tags.push(await tag.getText());
                    }
                } catch { }
            } catch {
                console.log("⚠️ Không tìm thấy product meta.");
            }

            // --- Cập nhật Brand từ Specifications nếu có ---
            if (product.specifications.brand) {
                product.brand = product.specifications.brand;
                delete product.specifications.brand;
            }
            if (product.specifications.gender) {
                product.gender = product.specifications.gender;
                delete product.specifications.gender;
            }
            if (product.specifications.origin) {
                product.origin = product.specifications.origin;
                delete product.specifications.origin;
            }
            if (product.specifications.color_variation) {
                product.color_variation = product.specifications.color_variation;
                delete product.specifications.color_variation;
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