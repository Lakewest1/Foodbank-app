import mongoose from "mongoose"

// create order Schema//
const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "Food Processing" },  // Pending,delivered or on the way//
  date: { type: Date, default: Date.now() }, // For current date
  payment: { type: Boolean, default: false }  // Wenever order is place d payment will be false//
  
})
// Using the schema above we will create order model//
const orderModel = mongoose.models.order  ||  mongoose.model("order",orderSchema)


// Now let export the orderModel//
export default orderModel;   // Then go and create the controller//