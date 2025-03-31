// Let create the basic express server for th set up//
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import UserRouter from './routes/userRoute.js'
import 'dotenv/config' // now .env file will be included in our project//  Then go to the userController and attach the //
 import cartRouter from "./routes/cartRoute.js"
import orderRouter from './routes/orderRoute.js'




// app config// To initialise the app using the express package//
const app = express()
// Let declare the port the our app will be running//
const port = process.env.PORT || 4000      // Bf laughing to github


// middleware// let initialixe our middleware//
app.use(express.json())    // this will allow us to pass request from frontend tp backend//
app.use(cors())            // This will allow us to access the backend from any frontend//

// Db Connection//
connectDB();


// API end point=======//
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'))   // For images  to display in frontend
app.use("/api/user", UserRouter)    // this is for User Login and register in the site// Then go back to the User controller after this//
app.use("/api/cart", cartRouter)        // This is for the cart logic//
app.use("/api/order",orderRouter)      // Now u can go to controller and set the stripe and the logic to place order//


//Security=================//

app.use((req, res, next) => {
  // ========================
  // Core Security Headers
  // ========================
  res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains'); // 2 years
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY'); // Fallback for older browsers
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', "geolocation=(), microphone=(), camera=(), payment=()");

  // ========================
  // Advanced Isolation
  // ========================
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp'); // Enables SharedArrayBuffer
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');

  // ========================
  // Content Security Policy
  // ========================
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self'", // Default fallback
      "script-src 'self' 'unsafe-eval' https://cdn.jsdelivr.net", // Allow JS CDNs
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com", // Allow inline styles (required for some libs)
      "img-src 'self' data: https: blob:", // Allow data URIs and external images
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://api.foodbank-app.onrender.com", // API endpoints
      "frame-src 'none'", // Block all iframes
      "form-action 'self'", // Restrict form submissions
      "base-uri 'self'", // Prevent base tag hijacking
      "upgrade-insecure-requests" // Force HTTPS
    ].join('; ')
  );

  // ========================
  // Additional Protections
  // ========================
  res.setHeader('X-XSS-Protection', '1; mode=block'); // Legacy XSS protection
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
  res.setHeader('Cache-Control', 'no-store, max-age=0'); // For sensitive pages
  
  next();
});
// To send request from backend to frontend//end
app.get("/", (req,res) => {
  res.send("API is working")             // anything we put here we show in frontend//
})



// To run the express server//
app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`)
})


