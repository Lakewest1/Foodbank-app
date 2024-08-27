import userModel from "../models/userModel.js";
// for authentication we import jwt//
import jwt from "jsonwebtoken";
// for securing the user details and hatching password we import bcrypt//
import bcrypt from 'bcryptjs' //

// To check if the email and password is correct //
import validator from "validator";



// let create Log in user Function//Note: First create regisrter bf this//
const loginUser = async (req, res) => {   // after we have tested the register let create login user//
  // we need the email and password from the request.body//
  const { email, password } = req.body;
  //we need to check if the email and password is correct//
  try {

    // fisrt check if the user is available in database//
    const user = await userModel.findOne({ email });
    // Now we check if we were able to get the email//
    if (!user) {
      // if the user is not available we return an error message//
      return res.json({ success: false, message: "User does not exist" })
      
    }
    // We user exist we will match the user password with the one  stored password in the database//
    const isMatch = await bcrypt.compare(password, user.password) // We compare d one the person enter with one in db
    // if the password is not match then we return error message//
    if (!isMatch) {
      return res.json({ success:false,message:"Invalid credentials"})
    }
    // if the password is match then we will generate a token for the user//
    const token = createToken(user._id)      // Then we pass user id to the web token //
    // we will return the token to the user //
    return res.json({success:true,token})
  } catch (error) {
    // if error occur during the above logic then we response error to the user//
    console.log(error);
    res.json({success:false,message:"Error"})   // Now let test it using post man//
    
  }

  
}

// Now let create new user token  For the NewUser we have creted down //
   const createToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, /*{ expiresIn: '1h' }*/);
} // Added expiry time)   // Now we use user id to create JWT for each newUser //  Now let go to the  .env file in the bsck end// and set thhe secret jwt //            

// Create register user function  //
const registerUser = async (req, res) => {
  // We first detructure the name,email and password //
  const { name, password, email,price } = req.body;                // We have storedd the name,password and email inside a variable (req.body)
  // Now we will add try and catch block//
  try {
    // Now we checking if users already exist//
    const exists = await userModel.findOne({ email })  // if the email entered is same save it into varaible exists
    //now the condition//
    if (exists) {
      return res.json({ success: false, message: "User already exist" })  // we use success false bcos the name is already there//
    }

    // Now we will valid the email format and password//
    if (!validator.isEmail(email)) {   // it will check if user email is correctly written//
      // then show message//
      return res.json({ success: false, message: "Please enter a valid email" })
    }
    // For checking weak password//
    if (password.length < 8) {   // checking if password is les than 8
      return res.json({ success: false, message: "Please enter a very strong password" })
      
    }
    // Now let create account if the validator and password is valid bt bf that we have to first hatch the password//

    // hatching  user password using salt and bcrypt//
    const salt = await bcrypt.genSalt(10)    // the higher the number the stronger the password//N.B:If we use 15 it will take time to encrypt
    // for hatching password//
    const hashedPassword = await bcrypt.hash(password, salt);

    //Now let create the New User//
    const newUser = userModel({  // then we provide name,email and password for new user to be created//
      name: name,
      price: price,
      email: email,
      password:hashedPassword        //Here we used the hactched password//

    })
    // Now Let save the uNew user detail//
    const user = await newUser.save();        // we stored the newuser inside the user variable//
    //Now let take the user id and generate token//
    const token = createToken(user._id);
    // Now we will send the token as response ++++++++++++++++//
    res.json({ success: true, token })
    
  } catch (error) {
    //if error occur ==============//
    console.log(error)
    res.json({success:false,message:"error"})   // Now we will test the api using Postman//
    }
  }


// let export the fuction so we can use them in Routes//

export {loginUser,registerUser}
// After the appi is working go backe to the front end and link it with backend using axios//
