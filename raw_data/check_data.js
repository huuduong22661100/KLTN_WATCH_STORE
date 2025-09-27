const fs = require('fs');

function checkDataConsistency() {
    console.log("🔍 Kiểm tra dữ liệu...\n");
    
    let detailsData = [];
    let faqsData = [];
    
    // Đọc file details.json
    try {
        if (fs.existsSync("details.json")) {
            detailsData = JSON.parse(fs.readFileSync("details.json", "utf-8"));
            console.log(`📄 details.json: ${detailsData.length} sản phẩm`);
        } else {
            console.log("❌ Không tìm thấy file details.json");
        }
    } catch (e) {
        console.error("❌ Lỗi đọc details.json:", e.message);
    }
    
    // Đọc file product_and_faqs.json
    try {
        if (fs.existsSync("product_and_faqs.json")) {
            faqsData = JSON.parse(fs.readFileSync("product_and_faqs.json", "utf-8"));
            console.log(`📄 product_and_faqs.json: ${faqsData.length} sản phẩm`);
        } else {
            console.log("❌ Không tìm thấy file product_and_faqs.json");
        }
    } catch (e) {
        console.error("❌ Lỗi đọc product_and_faqs.json:", e.message);
    }
    
    console.log("\n" + "=".repeat(50));
    
    // Kiểm tra ID trong details.json
    if (detailsData.length > 0) {
        console.log("\n🔢 Kiểm tra ID trong details.json:");
        const detailsIds = detailsData.map(item => item.id);
        const duplicateDetailsIds = detailsIds.filter((id, index) => detailsIds.indexOf(id) !== index);
        
        if (duplicateDetailsIds.length > 0) {
            console.log(`❌ Có ${duplicateDetailsIds.length} ID trùng lặp:`, [...new Set(duplicateDetailsIds)]);
        } else {
            console.log("✅ Không có ID trùng lặp");
        }
        
        // Kiểm tra ID có liên tục không
        const maxId = Math.max(...detailsIds);
        const expectedIds = Array.from({length: maxId}, (_, i) => i + 1);
        const missingIds = expectedIds.filter(id => !detailsIds.includes(id));
        
        if (missingIds.length > 0) {
            console.log(`⚠️ Thiếu ${missingIds.length} ID:`, missingIds.slice(0, 10), missingIds.length > 10 ? '...' : '');
        } else {
            console.log("✅ ID liên tục từ 1 đến", maxId);
        }
    }
    
    // Kiểm tra ID trong product_and_faqs.json
    if (faqsData.length > 0) {
        console.log("\n🔢 Kiểm tra ID trong product_and_faqs.json:");
        const faqsIds = faqsData.map(item => item.id);
        const duplicateFaqsIds = faqsIds.filter((id, index) => faqsIds.indexOf(id) !== index);
        
        if (duplicateFaqsIds.length > 0) {
            console.log(`❌ Có ${duplicateFaqsIds.length} ID trùng lặp:`, [...new Set(duplicateFaqsIds)]);
        } else {
            console.log("✅ Không có ID trùng lặp");
        }
        
        // Kiểm tra ID có liên tục không
        const maxId = Math.max(...faqsIds);
        const expectedIds = Array.from({length: maxId}, (_, i) => i + 1);
        const missingIds = expectedIds.filter(id => !faqsIds.includes(id));
        
        if (missingIds.length > 0) {
            console.log(`⚠️ Thiếu ${missingIds.length} ID:`, missingIds.slice(0, 10), missingIds.length > 10 ? '...' : '');
        } else {
            console.log("✅ ID liên tục từ 1 đến", maxId);
        }
    }
    
    // So sánh title giữa hai file
    if (detailsData.length > 0 && faqsData.length > 0) {
        console.log("\n📋 So sánh title giữa hai file:");
        
        const detailsTitles = new Set(detailsData.map(item => item.title));
        const faqsTitles = new Set(faqsData.map(item => item.title));
        
        const commonTitles = [...detailsTitles].filter(title => faqsTitles.has(title));
        const onlyInDetails = [...detailsTitles].filter(title => !faqsTitles.has(title));
        const onlyInFaqs = [...faqsTitles].filter(title => !detailsTitles.has(title));
        
        console.log(`🤝 Chung: ${commonTitles.length} sản phẩm`);
        console.log(`📄 Chỉ có trong details.json: ${onlyInDetails.length} sản phẩm`);
        console.log(`❓ Chỉ có trong product_and_faqs.json: ${onlyInFaqs.length} sản phẩm`);
        
        if (onlyInDetails.length > 0) {
            console.log("\n📄 Một số sản phẩm chỉ có trong details.json:");
            onlyInDetails.slice(0, 10).forEach(title => console.log(`  - ${title.substring(0, 80)}...`));
        }
        
        if (onlyInFaqs.length > 0) {
            console.log("\n❓ Một số sản phẩm chỉ có trong product_and_faqs.json:");
            onlyInFaqs.slice(0, 10).forEach(title => console.log(`  - ${title.substring(0, 80)}...`));
        }
    }
    
    console.log("\n" + "=".repeat(50));
    console.log("✨ Hoàn tất kiểm tra!");
}

checkDataConsistency();