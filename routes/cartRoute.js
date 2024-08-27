// Now we will use the three function we created in controllers to cretae routes//

import express  from "express"

// import the three functions//
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js"

// First import the middleware//
import authMiddleware from "../middleware/auth.js";  // Thn go down and add the middleware to the three routes//

// Now let create router from express js//
const cartRouter = express.Router();

//Now using the router above we will create multiple endpoint//    // last:We added the middleware here//
cartRouter.post("/add",authMiddleware,addToCart);    /// For add to cart
cartRouter.post("/remove",authMiddleware,removeFromCart);  // For remove
cartRouter.post("/get",authMiddleware,getCart)             // for get// Since wen d user click on the food token it gotten and the food is added to the cart,so we have to decode the token using middle ware//



// export default cartRouter//
export default cartRouter;       // so we can initialise it in server.js//

