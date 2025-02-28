// import mongoose from "mongoose";

// export default function mongooseConnect() {
//   if (mongoose / connection.readyState === 1) {
//     return mongoose.connection.asPromise();
//   } else {
//     const uri = process.env.MONGODB_URI;
//     return mongoose.connect(uri);
//   }
// }
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return; // Prevent multiple connections

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw new Error("Database connection failed");
  }
};
