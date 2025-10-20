import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Watch_store';

// Product Schema
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true, trim: true },
  description: [{
    name: { type: String },
    title: { type: String },
  }],
  images: {
    mainImg: {
      url: { type: String, required: true },
      alt_text: { type: String }
    },
    sliderImg: [{
      url: { type: String },
      alt_text: { type: String }
    }]
  },
  price: { type: Number, min: 0 },
  stock: { type: Number, required: true, min: 0, default: 0 },
  brand: { type: String },
  sku: { type: String },
  category_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  tags: [{ type: String }],
  gender: { type: String, enum: ['Nam', 'Nữ'] },
  origin: { type: String, default: "Nhật Bản" },
  color_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Color' }],
  specifications: {
    weight: { type: String },
    movement: { type: String },
    size: { type: String },
    thickness: { type: String },
    band_variation: { type: String },
    glass_material: { type: String },
    water_resistance_level: { type: String },
    dial_shape: { type: String }
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

async function updateProducts() {
  try {
    // Kết nối MongoDB
    console.log('🔌 Đang kết nối tới MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Đã kết nối thành công!\n');

    // Đọc dữ liệu từ file details.json
    const detailsPath = path.join(__dirname, 'details.json');
    const productsData = JSON.parse(fs.readFileSync(detailsPath, 'utf-8'));

    console.log(`📦 Tìm thấy ${productsData.length} sản phẩm cần cập nhật\n`);

    let successCount = 0;
    let failCount = 0;
    let notFoundCount = 0;

    // Cập nhật từng sản phẩm
    for (const productData of productsData) {
      try {
        const { id, categories_id, color_id } = productData;

        // Tìm sản phẩm theo trường id
        const product = await Product.findOne({ id: id });

        if (!product) {
          console.log(`⚠️  Không tìm thấy sản phẩm có id: ${id}`);
          notFoundCount++;
          continue;
        }

        // Chuyển đổi categories_id từ array of objects sang array of ObjectId
        const categoryObjectIds = categories_id.map(cat => new mongoose.Types.ObjectId(cat.$oid));
        
        // Chuyển đổi color_id từ object sang ObjectId (lưu dạng array)
        const colorObjectId = color_id ? [new mongoose.Types.ObjectId(color_id.$oid)] : [];

        // Cập nhật sản phẩm theo id
        await Product.updateOne(
          { id: id },
          {
            $set: {
              category_id: categoryObjectIds,
              color_id: colorObjectId
            }
          }
        );

        console.log(`✅ Đã cập nhật sản phẩm id: ${id}`);
        console.log(`   - Title: ${product.title}`);
        console.log(`   - Categories: ${categoryObjectIds.length} category`);
        console.log(`   - Color: ${colorObjectId.length} color\n`);
        successCount++;

      } catch (error) {
        console.error(`❌ Lỗi khi cập nhật sản phẩm id ${productData.id}:`, error.message);
        failCount++;
      }
    }

    // Tổng kết
    console.log('\n' + '='.repeat(50));
    console.log('📊 KẾT QUẢ CẬP NHẬT:');
    console.log('='.repeat(50));
    console.log(`✅ Thành công: ${successCount} sản phẩm`);
    console.log(`❌ Thất bại: ${failCount} sản phẩm`);
    console.log(`⚠️  Không tìm thấy: ${notFoundCount} sản phẩm`);
    console.log(`📦 Tổng số: ${productsData.length} sản phẩm`);
    console.log('='.repeat(50));

  } catch (error) {
    console.error('❌ Lỗi nghiêm trọng:', error);
  } finally {
    // Đóng kết nối
    await mongoose.connection.close();
    console.log('\n📴 Đã đóng kết nối MongoDB');
  }
}

// Chạy script
updateProducts();
