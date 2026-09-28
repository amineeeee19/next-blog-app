import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = "mongodb+srv://amoussouni_db_user:yrf574gt5i6blneuyrkbu@cluster0.dwoctvi.mongodb.net/"

const AdminSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const AdminModel = mongoose.models.admin || mongoose.model("admin", AdminSchema);

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to DB");

    const plainPassword = "azerty123"; // 👈 password بسيط وواضح
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await AdminModel.create({
      email: "admin@blog.com", // 👈 إيميل بسيط وواضح
      password: hashedPassword,
    });

   
  } catch (err) {
    console.error("❌ Erreur:", err);
  } finally {
    process.exit();
  }
}

run();