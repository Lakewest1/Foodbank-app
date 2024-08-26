import foodModel from "../models/foodModel.js";
import fs from 'fs'     // file sysasytem from Node js


//Add food item to database//
const addFood = async (req, res) => {
  
  // let first store name of image//
  let image_filename = `${req.file.filename}`;

  // let create a new food using the foodModel we have ceated//
  const food = new foodModel({         // Here we are providing value for foodModel//
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image:image_filename
  })
  // Let use the try catch logic //
  try {
    await food.save(); // To save the food inside the database//
    // response when food is loaded//
    res.json({success:true,message:"Food Added to database"})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"error adding food to DB"})
    
  }
   
}

// add all FOOD list in the database//
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});    // This will get all the food item
    res.json({success:true,data:foods})    // we pass all food data into data and show success
  } catch (error) {
    console.log(error)
      res.json({success:false,message:"error in getting food"})
  }

  }
  
// remove food from database//
const removeFood = async (req, res) => {
  try {
    // let first find the food we want to delete//
    const food = await foodModel.findById(req.body.id)  // we ant toi remove food by id so it is store in variable called food//
    // To delete the image along with remove//
    fs.unlink(`uploads/${food.image}`, () => { })   // to delete image from the folder//
    // Now let use the id in line 48 to delete the product from database//
    await foodModel.findByIdAndDelete(req.body.id)    // This will delete food from the db//
    res.json({success:true,message:"Food Removed from db"})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error in removing"})
    
  }
    
  }

 



 export {addFood,listFood,removeFood}