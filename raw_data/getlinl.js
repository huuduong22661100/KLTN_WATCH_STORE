const { Builder, Browser, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

(async function scrape() {
  let options = new chrome.Options();
  options.addArguments('--ignore-certificate-errors');
  options.addArguments('--ignore-ssl-errors');

  let driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();

  const url = 'https://www.casio-vietnam.vn/casio/';

  try {
    console.log(`Đang mở trang: ${url}`);
    await driver.get(url);

    // Lấy danh sách link hiện có từ file links.json nếu có
    let existingLinks = [];
    const filePath = "links.json";
    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        existingLinks = JSON.parse(fileContent);
        console.log(`Đã tìm thấy ${existingLinks.length} link hiện có trong file links.json.`);
      } catch (e) {
        console.error("Không thể đọc hoặc phân tích file links.json. Tạo file mới.");
      }
    }
    
    // Tìm và lấy các link sản phẩm mới từ trang
    const newElements = await driver.findElements(By.css("a.woocommerce-LoopProduct-link.woocommerce-loop-product__link"));

    let newLinks = [];
    for (let el of newElements) {
      let href = await el.getAttribute("href");
      if (href) {
        newLinks.push(href);
      }
    }

    console.log("Tổng số link sản phẩm mới lấy được:", newLinks.length);
    
    // Kết hợp link cũ và link mới (loại bỏ link trùng lặp nếu cần)
    const allLinks = Array.from(new Set([...existingLinks, ...newLinks]));

    console.log("Tổng số link sau khi cập nhật:", allLinks.length);
    
    // Lưu link đã cập nhật vào file links.json
    fs.writeFileSync(filePath, JSON.stringify(allLinks, null, 2), "utf-8");
    console.log("Đã lưu tất cả link vào links.json");

  } catch (err) {
    console.error("Lỗi:", err);
  } finally {
    await driver.quit();
  }
})();
