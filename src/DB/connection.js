import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ DB connected");
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err.message);
    throw err; 
  }
};

export default connectDB;

