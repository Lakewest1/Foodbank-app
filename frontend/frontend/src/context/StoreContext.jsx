import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'; // Import PropTypes
import axios from "axios";

/*import { food_list } from "../assets/assets";   // import the dood from our asset so we can mount it in our context here //we can remove this bcos the food is coming from database*/


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => { // Destructure props to extract children

  // Now let create Global Cart for all the pages//
  const [cartItems, setCartItems] = useState({})           // UseState for cart

  // Here will will pass the backend api port so we can connect it to all component in front end//
  const url = "http://localhost:4000"        // then we scroll down and pass it so we can use it any where in frontend//
  
  // Creting user Token so we can  use it in login popup//
  const [token, setToken] = useState("")     // then scroll down and pass it
  

  //=======TO MAKE FOOD COME FROM DATABASE=====================//
  const [food_list, setFoodList] = useState([])      // We set all the food coming from db to be inside array// If you go to frontend we dont have any food again//
  
  // Now let crete Function to fetch the food in the database//
  const fetchFood = async () => {
    const response = await axios.get(url + "/api/food/list")    // Now we will call the api to fetch food from database//
    setFoodList(response.data.data)   // Since we want to run this function after reloaded..Go down under locaStorage and add the function inside useEffect//
  }




  
  // Now let create function and logic to add food to cart and remove it==========================================//

   // ADD TO CART LOGIC=================// 
  const addToCart = async (itemId) => {          // then we pass item id inside add to cart function for each item//
    if (!cartItems[itemId]) {                // if that food product id  isnt in available in  the cart 
      setCartItems((prev)=>({...prev,[itemId]:1}))           // then add the food to cart using its id// This is new entry 
    } 
    else {                                       // if food is already in the cart then plus 1// 
       setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))          
    }
    // To link the backend of cart to front end==// Come here and write ur code//LINKING BACK TO FRONT END//

    //=====We will first check if token is available//
    if (token) {
      // Then we will update it in the database also using axiox//
      await axios.post(url+ "/api/cart/add",{itemId},{headers:{token}})  // we append the url to the endpoint,den we attached the itemId and pass the token to the header too//Now go up nd add aysnc to line 38

    }
    
  }
  // REMOVE FROM CART LOGIC=================// 
  const removeFromCart = async (itemId) => {    // add async to connectb to db
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))      // if food is there or not sha minus 1 to remove it//
    // To remove food added to the database//
    if (token) {     // if we have token that means the user is login//
      // we will crete the api requestt//
      await axios.post(url + "/api/cart/remove", { itemId },{headers:{token}}) // we added item id den pass the token key to d header//

      
    }
  }

  /* Using UseEffect to check if add and removeFrom cart button is working===
  useEffect(() => {
    console.log(cartItems)
  },[cartItems])
==============*/
  
  // We want to get the subTotal ampount and Total amount of all the foods//DONE++ After we craeted cart page finish//

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    // We will use for looop to loop all food together so we can calculate everything//
    for (const item in cartItems) {
   
      if (cartItems[item] > 0)                  {/*If cart item is greater than 0 den do wat is under this */ }   
      { 
         let itemInfo = food_list.find((product) => product._id === item)    // we compare if product match the item available in cart//  
         totalAmount+=itemInfo.price * cartItems[item];  // We get each price of product and multiply by id (number)
      }
     
    }
    return totalAmount;
  }

  //=====To make the item added to cart Remain even after loaded//
  const loadCartData = async (token)=> {
    // Now we ill call the api//
    const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } })  //  we pass the token to the header//
    // Now we will add cart item to the data response we created//
    setCartItems(response.data.cartData);
  }

  // To prevent the user logout if they mistakenly refresh the page//
  useEffect(() => {
  
    // To load Food after Page is refreshed//
    async function loadData() {
      await fetchFood()    
        if (localStorage.getItem("token")) {           // If token is in local storage
          setToken(localStorage.getItem("token"));     // then we set the token to the local storage so that wen we reload it wonnt logout//
          
          // We will pass the loadCartData from line 91 up for food to remain after reloading the page heree//
          await loadCartData(localStorage.getItem("token"))   // Go to browser and check

    }
    }
    // Now let call the function here//
    loadData();             // this will make the food show but picture wont// To make picture show go to foodItem//
    
  },[])
  



  const contextValue = {
    // Add any initial context values here if needed//
    food_list,           //Now we can access the food array anywhere in our app// bcos it is in global variable
    cartItems,
    setCartItems,                //Now we can access the food,cartItems,addTocart and removeFromCart//
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,                    // We pass the url so we can access the backend in any component of frontend//Then go back to login pop up nd fetch the url so u can use it there
    token,
    setToken

  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

// Define prop types for validation
StoreContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default StoreContextProvider;
