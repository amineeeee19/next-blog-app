// test-upload.js
// Usage: node test-upload.js "C:\path\to\image.png"

const fs = require("fs");
const path = require("path");

async function main() {
  const imagePath = process.argv[2];

  if (!imagePath) {
    console.error("❌ Merci de fournir le chemin de l'image en argument.");
    console.error('Exemple: node test-upload.js "C:\\Users\\sts\\Pictures\\test.png"');
    process.exit(1);
  }

  if (!fs.existsSync(imagePath)) {
    console.error(`❌ Le fichier n'existe pas: ${imagePath}`);
    process.exit(1);
  }

  const fileBuffer = fs.readFileSync(imagePath);
  const fileName = path.basename(imagePath);

  const formData = new FormData();
  const blob = new Blob([fileBuffer]);
  formData.append("image", blob, fileName);

  console.log(`📤 Envoi de "${fileName}" vers http://localhost:3000/api/blog ...`);

  try {
    const res = await fetch("http://localhost:3000/api/blog", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(`✅ Status: ${res.status}`);
    console.log("Réponse:", data);
  } catch (err) {
    console.error("❌ Erreur:", err);
  }
}

main();
