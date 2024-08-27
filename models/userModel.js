import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Unique make sure that one email cant be used to create another account again//
  password: { type: String, required: true },
  // Let create cartData where we will manage the users card//
  cartData:{type:Object,default:{}}
}, { minimize: false })  // we added minimize bcos we want it to create cart without data.if we didnt put this it wont work


const userModel = mongoose.models.users || mongoose.model("user", userSchema) // if model not created,create new model

export default userModel;