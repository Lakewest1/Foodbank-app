

# 🍽️ FoodDeliveryApp - Full Stack Food Delivery Application

**FoodDeliveryApp** is a comprehensive, full-stack web application designed for seamless food ordering and delivery. Built using the **MERN stack** (MongoDB, Express, React, and Node.js), this app offers a complete end-to-end solution for restaurants and customers, enabling them to place, process, and deliver food orders efficiently. Integrated with **Stripe** for secure payments, the app also features a robust **JWT-based authentication system**, a **responsive UI**, and real-time order tracking.

---

## 🌟 Features

- **User Authentication**: Secure user registration and login using **JWT (JSON Web Tokens)** and **bcrypt** for password hashing.
- **Admin Dashboard**: A dedicated admin interface to manage restaurants, menus, and customer orders.
- **Food Ordering**: Customers can browse through a variety of food categories, view detailed descriptions, add items to their cart, and place orders with ease.
- **Stripe Payment Integration**: Seamless and secure online payments through **Stripe API** for both one-time and recurring payments.
- **Cart Functionality**: Add, remove, and update items in the shopping cart, with real-time price calculation.
- **Order Management**: Track the status of orders in real-time, from confirmation to delivery.
- **Responsive Design**: Fully optimized for mobile and desktop platforms using **React** and **CSS3**, ensuring a smooth user experience across devices.
- **API Endpoints**: Robust **RESTful API** with routes for user authentication, order processing, cart management, and more.
- **Role-Based Authorization**: Admins, restaurant owners, and customers each have specific roles and privileges.


---

## 🔧 Technologies

## Frontend:
- **React.js**: Dynamic and responsive user interface built with **React** components and **React Router** for navigation.
- **Axios**: HTTP client used for making API requests to the backend.
- **CSS**: Preprocessor for styling the app with clean, maintainable CSS.
- **React-Slick**: Carousel functionality to display promotional banners and featured dishes.

### Backend:
- **Node.js**: Fast and scalable runtime environment for building server-side logic.
- **Express.js**: RESTful API and server management using **Express**.
- **MongoDB**: NoSQL database to store user details, food items, orders, and transactions.
- **Mongoose**: MongoDB object modeling for Node.js, ensuring smooth database operations.
- **Multer**: Middleware for handling image uploads, such as food images and user profile pictures.
- **JWT**: Secure authentication with **JSON Web Tokens** for protected routes.
- **bcrypt**: Password hashing for secure user authentication.

### Payment Integration:
- **Stripe API**: Secure online payment processing for credit and debit card transactions.

### Deployment:
- **Render**: Both the Frontend and Backend hosted on *Render.com* for easy deployment and scalability.


## 🚀 Getting Started

### Prerequisites:
- Node.js v18+
- MongoDB (Local or Atlas)
- Stripe API keys (for payment integration)

### Installation:

1. Clone the repository:

   ```bash
   git clone https://github.com/username/FoodDeliveryApp.git
   ```

2. Navigate to the project directory:

   ```bash
   cd FoodDeliveryApp
   ```

3. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

4. Install frontend dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

5. Set up your environment variables by creating a `.env` file in the `backend` directory with the following:

   ```env
   MONGO_URI=your_mongo_db_connection_string
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

6. Run the backend server:

   ```bash
   cd backend
   npm start
   ```

7. Run the frontend server:

   ```bash
   cd frontend
   npm start
   ```

---

## 📚 API Documentation

| Method | Endpoint                 | Description                              |
|--------|--------------------------|------------------------------------------|
| POST   | /api/users/register       | Register a new user                      |
| POST   | /api/users/login          | Log in a user                            |
| GET    | /api/foods                | Get all available food items             |
| POST   | /api/orders               | Place a new order                        |
| GET    | /api/orders/:id           | Get details of a specific order          |
| POST   | /api/payments/stripe      | Process payment through Stripe API       |

For detailed API documentation, refer to the [API Reference](docs/API.md).

---

## 📊 Database Schema

### Users Collection:
- `username`: String
- `email`: String
- `password`: String (hashed using bcrypt)
- `role`: String (admin, restaurant, customer)
- `cart`: Array of food items

### Foods Collection:
- `name`: String
- `description`: String
- `price`: Number
- `category`: String (e.g., Pizza, Sushi, Beverages)
- `image`: String (uploaded via Multer)

### Orders Collection:
- `userId`: ObjectId (reference to the user)
- `items`: Array of food items
- `totalAmount`: Number
- `status`: String (Pending, Confirmed, Delivered)

---

## 💻 Contributing

We welcome contributions from the community. Please read our [contributing guide](CONTRIBUTING.md) to get started.

---

## 🔒 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🌐 Live Demo

Check out the live demo of the app: [FoodDeliveryApp Demo](https://fooddeliveryapp-demo.vercel.app)

---

Feel free to reach out if you have any questions or suggestions!

---

This `README.md` covers relevant keywords like "MERN stack," "JWT authentication," "Stripe integration," "food delivery," "Node.js," "Express," and "React," making it easier for Google to index the repository and for users to find it through search engines.
