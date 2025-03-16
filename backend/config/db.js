import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://greatstack:leloicoi123@cluster0.krr5o.mongodb.net/fruitshop').then(() => console.log("DB Connected"));
}