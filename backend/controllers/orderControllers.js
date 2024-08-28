import orderModel from "../models/orderModel.js"  // We imported orderModel //
import userModel from "../models/userModel.js"   // we imported the userModel for each users//
import Stripe from "stripe"



// let create variable for the stripe//
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);  // Now we have the support of stripe for odering food//

// We will create arrow function for place Order// Placing user order from front end cart//
const placeOrder = async (req, res) => {

  //const frontend_url = "http://localhost:5173"   // We define the frontend url so we can connect the payment to it//
  
  const frontend_url = https://foodbank-app.onrender.com


  try {
    const newOrder = new orderModel({
      userId: req.body.userId,            // We get it from middle ware// check auth.js//
      items: req.body.items,
      amount: req.body.amount,
      address:req.body.address
    })
    // Now let save since we have gottent our data//
    await newOrder.save()             // This will save our order in database//
    //After dat we have to clear the order cart//
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })  // This will clear the data
    
    //  Now we have to create payment link using stripe====================================================================//
    //====But first we have to fisrt create line-items where we will insert product data,unit amout,quantity//
 // Creating line items from the cart
const line_items = req.body.items.map((item) => ({
  price_data: {
    currency: "ngn", // Or change to the appropriate currency like "usd"
    product_data: {
      name: item.name
    },
    unit_amount: item.price * 100, // Stripe expects the amount in the smallest currency unit (cents for USD, kobo for NGN, etc.)
  },
  quantity: item.quantity
}));

// Adding delivery charges
line_items.push({
  price_data: {
    currency: "ngn", // Or your currency code
    product_data: {
      name: "Delivery Charges For this Food"
    },
    unit_amount: 200*100,  // For example, ₦200 delivery charge becomes 20000 kobo
  },
  quantity: 1
});


    // We will now use the line- items to create session for each order//
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      // Let check if the payment success or fail//   // Go hope and connect the port 5713 //
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,   // It maeans if the payment is successfull,it will take us back to frontend 
      cancel_url : `${frontend_url}/verify?success=false&orderId=${newOrder._id}`  // If it didnt succeed//
    })
    // Now we will create response//
    res.json({success:true,session_url:session.url})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"error"})    // Now we will link this with our frontend//go to frontend.pages to placeOrder.jsx file
  }
  
}


// To verify the order and show notification//
const verifyOrder = async (req, res) => {   // Now we will go to the orderRoute and create route//
  // fisrt we first get the orderId and success//
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      // If the success is true,we will make the payment true//
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" })
    } else {
      await orderModel.findOneAndDelete(orderId);
      res.json({success:false,message:"Not Paid"})
    }
    
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})     // Now go to frontend and create new page for verify//
    
  }
  
}

//Each  Users ORDER FOR FRONTEND=======================================================>//
const userOrder = async (req,res) => {
  try {
    //Let first find all the orders of that users//
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders })   // This will let the user get order details//
    console.log(req.body.userId);

  } catch (error) {
    console.log(error)
     res.json({success: false, message: error.message});

  }
}

// Listing Orders for the Admin pannel//
const listOrder = async (req, res) => {   // Now go and set it up in the orderRoute//
  try {
    const orders = await orderModel.find({});   // This will help us to get all the orders 
    res.json({success:true,data:orders})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"error"})   //Since it is working let integrate it with the admin pannel
  }
}

//api For updating the order stutus//
const updateStatus = async (req, res) => {  // Now go to the orderRoute.js//
  try {
    // Let first find the order using id and update it//
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })  // This will update status in the database//
    res.json({success:true,message:"Status Updated"})
  } catch (error) {
    console.log(error)
      res.json({success:false,message:"error"})
  }
}



// Export the placeorder fuction to use it in route//
export {placeOrder,verifyOrder,userOrder,listOrder,updateStatus}
