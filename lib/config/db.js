import mongoose from "mongoose";

export const connectDB = async () => {
    const dbUrl = process.env.MONGODB_URI;

    console.log("🔗 MONGODB_URI existe ?", !!dbUrl);

    try {
        await mongoose.connect(dbUrl);
        console.log("✅ MongoDB connectée");
    } catch (error) {
        console.log("❌ Erreur MongoDB :", error);
        throw error;
    }
};