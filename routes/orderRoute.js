import express from "express"    // we imported express server//
import authMiddleware from "../middleware/auth.js"  // We imported authMiddleware//
// Now let import the place order fuction//
import { placeOrder, userOrder, verifyOrder,listOrder, updateStatus } from "../controllers/orderControllers.js"

//Now let craete the router using the express//
const orderRouter = express.Router();

// Now we can use the orderRouter to create multiple end point for front end to connect to backend//
orderRouter.post("/place", authMiddleware, placeOrder);
// let add add the verifyRoute heree//
orderRouter.post("/verify", verifyOrder);   // now go back and add the logic in controller//
orderRouter.post("/userorders", authMiddleware, userOrder)    // We craeted the userOrder route now go back to controller//
orderRouter.get('/list', listOrder)   // For listing all food that are ordered in admin page//
orderRouter.post('/status',updateStatus)


// Export the orderRouter so that we can use it in server.js
export default orderRouter;



