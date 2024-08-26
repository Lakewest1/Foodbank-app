// Note:This is where each token of product are decode//

import jwt from 'jsonwebtoken'

// creating middlwware for add,remove and getCart----------//
const authMiddleware = async (req, res,next) => {
  // get the token first//
  const {token} = req.headers
  // checking if we get token or not//
  if (!token) {
    return res.json({success:false,message:'Not Authorize login again'}) // If we didnt get token show this message//
    
  }
  // if we get the token then we decode it here//
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET) // This line will decode  the token//
    req.body.userId = token_decode.id // We save the decode inside container call req.body.userId
    next()
    
  } catch (error) {
    console.log(error)
    res.json({ success: false, message:'Error'}) //-------- This is displyed when we cant decode the token----------//
    
  }


}
export default authMiddleware;