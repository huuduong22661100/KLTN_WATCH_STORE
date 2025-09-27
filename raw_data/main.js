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

  try {
    console.log("Đang mở trang...");
    await driver.get('https://phongvu.vn/c/laptop');

    // Đợi load
    await driver.sleep(5000);

    while (true) {
      try {
        // Scroll xuống cuối để hiện nút
        await driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");
        await driver.sleep(2000);

        let button = await driver.findElement(By.xpath("//div[contains(text(),'Xem thêm sản phẩm')]"));
        if (button) {
          console.log("Bấm 'Xem thêm sản phẩm'...");
          await driver.executeScript("arguments[0].click();", button);
          await driver.sleep(4000); // chờ sản phẩm load thêm
        }
      } catch (err) {
        console.log("Không còn nút 'Xem thêm sản phẩm'. Dừng load.");
        break;
      }
    }

    console.log("Đang lấy tất cả link sản phẩm...");
    const elements = await driver.findElements(By.css("div.product-card a"));

    let links = [];
    for (let el of elements) {
      let href = await el.getAttribute("href");
      if (href) {
        if (!href.startsWith("http")) {
          href = "https://phongvu.vn" + href;
        }
        links.push(href);
      }
    }

    console.log("Tổng số link:", links.length);
    fs.writeFileSync("links.json", JSON.stringify(links, null, 2), "utf-8");
    console.log("Đã lưu link vào links.json");

  } catch (err) {
    console.error("Lỗi:", err);
  } finally {
    await driver.quit();
  }
})();
