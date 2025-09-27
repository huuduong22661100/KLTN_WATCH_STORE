import fs from "fs";

// Cấu hình tên file đầu vào và đầu ra
const inputFilePath = "links.json";
const outputFilePath = "products.json";

// Hàm chính để trích xuất thông tin
function extractProductDetails() {
  try {
    // 1. Đọc file JSON chứa danh sách URL
    const rawData = fs.readFileSync(inputFilePath, "utf-8");
    const urls = JSON.parse(rawData);

    if (!Array.isArray(urls)) {
      console.error("❌ Lỗi: File input không chứa một mảng các URL.");
      return;
    }

    // 2. Lặp qua từng URL và trích xuất thông tin
    const products = urls.map((url, index) => {
      let sku = "0"; // Mặc định gán "0" nếu không tìm thấy SKU

      // Phương pháp 1: Tìm kiếm SKU sau "sku="
      const skuParamMatch = url.match(/sku=(\d+)/);
      if (skuParamMatch) {
        sku = skuParamMatch[1];
      } else {
        // Phương pháp 2: Tìm kiếm SKU sau "--s"
        const skuSlugMatch = url.match(/--s(\d+)/);
        if (skuSlugMatch) {
          sku = skuSlugMatch[1];
        } 
      }

      // Tạo đối tượng với cấu trúc mong muốn
      return {
        link: url,
        id: index + 1, // Tạo ID dựa trên vị trí của URL trong mảng
        sku: sku,
      };
    });

    // 3. Ghi mảng sản phẩm vào file JSON
    fs.writeFileSync(
      outputFilePath,
      JSON.stringify(products, null, 2),
      "utf-8"
    );

    console.log(`✅ Đã trích xuất và lưu thông tin vào file: ${outputFilePath}`);
    console.log("Danh sách sản phẩm đã trích xuất:");
    console.log(JSON.stringify(products, null, 2));

  } catch (error) {
    console.error(`❌ Lỗi: ${error.message}`);
  }
}

// Chạy hàm chính
extractProductDetails();