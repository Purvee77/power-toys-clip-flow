const { execSync } = require('child_process');
console.log("🛠️ Starting compilation pipeline...");
try {
    console.log("📦 Compiling JavaScript into standalone machine binaries...");
    execSync('npx pkg index.js --target node16-win-x64 --output smart-clipboard-service.exe');
    console.log("====================================================");
    console.log("✔️ COMPILED SUCCESSFULLY: smart-clipboard-service.exe created!");
    console.log("====================================================");
} catch (error) {
    console.error("❌ Compilation error occurred:", error.message);
}
