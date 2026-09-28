import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "./config/db";
import AdminModel from "./models/adminModel";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("📩 Email reçu:", credentials.email);
        console.log("🔑 Password reçu:", credentials.password);

        await connectDB();
        console.log("✅ DB connectée");

        const admin = await AdminModel.findOne({ email: credentials.email });
        console.log("👤 Admin trouvé:", admin);

        if (!admin) {
          console.log("❌ Aucun admin avec cet email");
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password, admin.password);
        console.log("🔒 Password valide?", isValid);

        if (!isValid) {
          console.log("❌ Password incorrect");
          return null;
        }

        return { id: admin._id.toString(), email: admin.email };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};