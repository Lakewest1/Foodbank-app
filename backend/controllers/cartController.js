import userModel from "../models/userModel.js"

// We will create three function (AddTocart,Removefromcart and getCart)

// AddToCart function will add the product to the  user cart//
const addToCart = async (req, res) => {
  try {
    // we have to first get the userData from the userModel==========//
    const userData = await userModel.findById(req.body.userId)  // This allow us to get the data of the user//
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }
    // Now let extract the cartData//
    let cartData = userData.cartData;
    if (!cartData) {
      cartData = {};
    }
    //  Now we will check if the product is already in the cartData or not//
    if (!cartData[req.body.itemId]) {    //   If the product is not in the cartData,then we will add it//
      cartData[req.body.itemId] = 1;
    }
    else {             // If the product is already in the cart//
      cartData[req.body.itemId] += 1;  // Then we will increase the product by 1//
      
    }
    // We have to update the userCArt with new data//
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    // Then we will cretae response message//
    res.json({success:true,message:"Added to cart"})
  } catch (error) {
    // If error occur//
    console.log(error)
    res.json({success:false,message:"Error"})   // Now check using thunder client//
    
  }
  
}

// removeFromCart function will remove the product from the  user cart//
const removeFromCart = async (req,res) => {
  try {
    // We will first find the user data//
    let userData = await userModel.findById(req.body.userId)    
    // Let extract cart  data from userData
    let cartData = userData.cartData;  // now the cartData has been gooten//
    if (cartData[req.body.itemId]>0) {
      // Let check if the item is available//
      cartData[req.body.itemId] -= 1;
    }
    // now we update the new cart
    await userModel.findByIdAndUpdate(req.body.userId, { cartData })  // we find the id and update it wit the new data//
    res.json({success:true,message:"Remove from cart"})

  } catch (error) {
    //If errorr in the block code above//
    console.log(error)
    res.json({success:false,message:"error in removing"})
    
  }
  
}



// fetch user cart function will fetch all the product inside the  user cart//
const getCart = async (req, res) => {
  try {
    // let first fetch the userData//
    let userData = await userModel.findById(req.body.userId)//
    // From this userData we will get cartData//
    let cartData = await userData.cartData;  // Now we have gotten the user cartData
    //Response message==========//
    res.json({success:true,cartData})    // It will generated response success true and add the cartData immediately
  } catch (error) {
    // if error occur//
    console.log(error)
    res.json({success:false,msessage:"unable to get user cartData"})  // Now connect it to the front end// go to the frontend folder//
  }
  
}

// Export the three function//
export {addToCart,removeFromCart,getCart}     // the go to the route folder.