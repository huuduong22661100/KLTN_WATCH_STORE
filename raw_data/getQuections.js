import axios from "axios";
import fs from "fs";

// Cấu hình tên file
const productsFilePath = "products.json";
const detailsNewFilePath = "details_new.json";
const outputFilePath = "updated_details_test.json"; // Tên file cho bản thử nghiệm

// Hàm ánh xạ thuộc tính từ API sang cấu trúc mới
function mapAttributes(attributes) {
  const mappedData = {};
  const attrMap = new Map(attributes.map((attr) => [attr.code, attr]));

  function getValue(code, defaultValue = "") {
    const attr = attrMap.get(code);
    return attr ? attr.values.join(", ") : defaultValue;
  }

  const specs = {};

  // Dữ liệu cho các trường ở cấp gốc
  mappedData.series = getValue("laptop_series");
  mappedData.color = getValue("mau_sac_laptop");
  mappedData.part_number = getValue("laptop_partnumber");
  mappedData.category = getValue("nhucausudung");
  mappedData.name = getValue("laptop_ten");

  // Dữ liệu cho specifications
  specs.cpu = `${getValue("laptop_tencpu")} (${getValue("laptop_tocdoxulycpu")}, ${getValue("laptop_bonhocachecpu")}, ${getValue("laptop_sonhanluongxulycpu")})`;
  specs.gpu = `${getValue("laptop_chipdohoaroi")} ${getValue("laptop_dungluongbonhodohoa")} ${getValue("laptop_thehebonhodohoa")} (${getValue("ai_tops_card_roi")}) + ${getValue("laptop_chipdohoatichhop")}`;
  specs.display = `${getValue("laptop_kichthuocmanhinh")} ${getValue("laptop_congnghetamnenmanhinh")} (${getValue("laptop_dophangiaimanhinh")}), ${getValue("laptop_tansoquetmanhinh")}`;
  specs.webcam = getValue("laptop_webcam");
  specs.ram = getValue("laptop_dungluongbonho");
  specs.storage = getValue("laptop_dungluongssd");
  specs.ports = `${getValue("laptop_socongusbc")}`;
  specs.audio = `${getValue("laptop_socongketnoiamthanh")} + ${getValue("cong_nghe_am_thanh_laptop")}`;
  specs.connectivity = `${getValue("laptop_ketnoiwlan")}, ${getValue("laptop_ketnoibluetooth")}`;
  specs.keyboard = `${getValue("laptop_banphimco")}, ${getValue("laptop_dennenbanphim")}`;
  specs.os = getValue("laptop_hedieuhanh");
  specs.size = getValue("laptop_kichthuoc");
  specs.battery = `${getValue("laptop_congsuatpin")}, ${getValue("laptop_kieupin")}`;
  specs.weight = `${getValue("laptop_khoiluong")} kg`;
  specs.material = getValue("chat_lieu_laptop");
  specs.security = getValue("laptop_baomat");
  specs.led = getValue("laptop_den");
  specs.accessories = getValue("laptop_phukiendikem");

  mappedData.specifications = specs;

  return mappedData;
}

// Hàm chính để chạy chương trình
async function fetchAndMergeTestProducts() {
  try {
    // 1. Đọc danh sách SKU từ file products.json
    const rawSkusData = fs.readFileSync(productsFilePath, "utf-8");
    const skusList = JSON.parse(rawSkusData);

    // 2. Lấy 531 sản phẩm đầu tiên để thử nghiệm
    const testSkus = skusList.slice(0, 531);
    console.log(`➡ Bắt đầu thử nghiệm với ${testSkus.length} sản phẩm đầu tiên...`);

    // 3. Đọc dữ liệu gốc từ file details_new.json
    const rawDetailsData = fs.readFileSync(detailsNewFilePath, "utf-8");
    const products = JSON.parse(rawDetailsData);

    const updatedProducts = [...products];

    // 4. Lặp qua từng sản phẩm trong danh sách thử nghiệm
    for (const item of testSkus) {
      const { id, sku } = item;
      const productToUpdateIndex = updatedProducts.findIndex(
        (p) => p.id === id
      );

      if (productToUpdateIndex === -1) {
        console.log(`⚠️ Bỏ qua: Không tìm thấy sản phẩm có ID ${id} trong file details_new.json.`);
        continue;
      }

      console.log(`➡ Đang xử lý ID: ${id} | SKU: ${sku}`);

      const originalProduct = updatedProducts[productToUpdateIndex];

      if (sku === "0") {
        console.log(`⚠️ Bỏ qua: SKU cho ID ${id} là "0", không có dữ liệu để gộp.`);
        originalProduct.sku = sku;
        continue;
      }

      try {
        const apiRes = await axios.get(
          `https://discovery.tekoapis.com/api/v1/product?sku=${sku}&location=&terminalCode=phongvu`
        );
        const newAttributes = apiRes.data.result.product.productDetail.attributes;

        // Tạo dữ liệu mới
        const newProductData = mapAttributes(newAttributes);
        console.log(`  ✅ Đã lấy dữ liệu mới cho SKU ${sku}`);

        // Thay thế các trường cũ bằng các trường mới
        const mergedProduct = {
          ...originalProduct, // Giữ lại tất cả các trường cũ
          ...newProductData, // Ghi đè các trường gốc (series, color, ...) bằng dữ liệu mới
          sku: sku,
          specifications: newProductData.specifications // Thay thế hoàn toàn object specifications
        };

        updatedProducts[productToUpdateIndex] = mergedProduct;

      } catch (apiError) {
        console.log(`❌ Lỗi khi lấy dữ liệu cho SKU ${sku}: ${apiError.message}`);
      }
    }

    // 5. Ghi toàn bộ dữ liệu đã cập nhật vào file mới
    fs.writeFileSync(
      outputFilePath,
      JSON.stringify(updatedProducts, null, 2),
      "utf-8"
    );
    console.log(`✅ Đã gộp và lưu tất cả sản phẩm vào file mới: ${outputFilePath}`);

  } catch (error) {
    console.error(`❌ Lỗi: ${error.message}`);
  }
}

// Chạy hàm chính
fetchAndMergeTestProducts();