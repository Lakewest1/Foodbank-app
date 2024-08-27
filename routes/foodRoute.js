import express from 'express'
import { addFood,listFood, removeFood} from '../controllers/foodController.js'
import multer from 'multer'    // for image


// let create express router// Using this we can create post method,get method and get method//
const foodRouter = express.Router();     // this is from express package



// logic for image to save in uploads folder//Image storage Engine  //
const storage = multer.diskStorage({
  // we will cionfigure the disk storage to where we want to save image//
  destination: "uploads",
  filename: (req,file,cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);  // this will create a unique filename for each picture//
    
  }
})

// To use the storage configuration above//
const upload = multer({storage:storage})

// let create post method for form or uploading file in database//
foodRouter.post("/add", upload.single("image"), addFood)   // We put the middleware (upload) in btw after creating storage//
foodRouter.get("/list", listFood)    // To get all food 
foodRouter.post("/remove",removeFood)   // For the food to be remove from db






export default foodRouter;


// NOTE: once the food route has been created go back to controller and add Food logic//