// We first import express server //
import express from "express"
// Now we import loginUser and registerUser Function//
import { loginUser, registerUser } from "../controllers/userController.js"


// let create UserRouter using express Router//
const UserRouter = express.Router()


// Since we need the data of the user like email,id to create the user//So we have to create one post method//
UserRouter.post("/register", registerUser)
UserRouter.post("/login",loginUser)




// let export the userRouter//So we can use it to set up our data
export default UserRouter;
