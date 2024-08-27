import mongoose from "mongoose";    // connection to database


export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://olamilekan:7Ak4E3BjVAV6kISU@cluster0.ee2iqkp.mongodb.net/Food-App2').then(() => console.log('MOngo DB Connected'));
}