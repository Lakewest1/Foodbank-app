
import { useContext} from "react"
import "./PlaceOrder.css"
import { StoreContext } from "../../context/StoreContext"
import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const PlaceOrder = () => {

  // let fetch the total cart amount from used sontext//         //to add stripe first take token from d context//
  const { getTotalCartAmount,token,cartItems,url,food_list } = useContext(StoreContext);
  
  // Now we craete UseState to take all the data enter in the payment form//
  const [data, setData] = useState({    
    firstName: "",                        // all these are gotten from the place order of frontend//Everything is set to  empty string/
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone:""
    
  })

  // No we will create onchangeHandler which will change the  state of the data to what we type it//
  const oncChangeHandler = (event) => {
    // we will use the event to extract value typed inside each//
    const name = event.target.name;
    const value = event.target.value   //now we have catch the value//
    // now we will update the data with new value//
    setData(data=>({...data,[name]:value})) // we first get the old and add d new data which is inside d value// Now go down and link the onchangeHander//
  }
  // To make the button direct to stripe payment//
  const handlePlaceOrder = async (event) => {    // Now Go down to d proceed btn and link it with Type=submit// den at line 48 add Onsubmit
    // To prevent reloading of the page//
    event.preventDefault();

    // Now let call the aPI bt we have to first structure our data//
    let orderItems = [];
    food_list.map((item) => {  // We map all the food  item in the cart bcos we have to send them//
      if (cartItems[item._id] > 0) {  // If product there is is greater than zero//
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id]   // From itemID we will get the quantity//
        orderItems.push(itemInfo)      // Now go to the web and click on proceed to payment  and see all the food selected and dier data        
      }
    })
    // let check if the mapping is working or not//
    // console.log(orderItems);  //   For testing

    // ==== Let create OrderData variable=====//
    let orderData = {
      address: data,         //All data in line 33
      items: orderItems,     // order item in line 40
      amount: getTotalCartAmount() + 200,  // Totall amount line 114
    }
    // Now let send the order Data to the backend server//
    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    // Now we will check if the response is okay or not//
    if (response.data.success) {
      // we will get the session url//
      const { session_url } = response.data;
      // we have to send the users on this session url by typing//
      window.location.replace(session_url);
    }
    else {
      alert("Error");
    }
  
  }
    
    
  // To make our place order not show untiill we log in //  FOR SECURITY REASON//

  // Let use navigate to take us back to home page//
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {      // If token is not gotten  i.e the user is not log in//
      navigate('/cart')
    }
    else if (getTotalCartAmount() === 0)   // check if total is zero den send dem to cartpage//
    {
      navigate('/cart')      // It will remain in the cart nd not go to orderpage//
      }
  },[token,getTotalCartAmount,navigate])
  


  
  /* let check if each value type inside the input is catched//\ NOTE: We added required to all input field so it wont proceed wen empty//
  useEffect(() => {
    console.log(data)
  },[data])         Since we have verify we can remove this//
  */
return (
    
    <form onSubmit={handlePlaceOrder} className="place-order">
      <div className="place-order-left">
        <p className="titl">Delivery Information</p>
        <div className="multi-field">
          <input required type="text" name='firstName' onChange={oncChangeHandler} value={data.firstName} placeholder="First name" />
          <input  required type="text" name='lastName' onChange={oncChangeHandler} value={data.lastName}  placeholder="Last name"/>
        </div>
        <input  required type="email" name='email' onChange={oncChangeHandler} value={data.email} placeholder="Email address " />
        <input  required type="text" name='street' onChange={oncChangeHandler} value={data.street} placeholder="Street" />
        
           <div className="multi-field">
          <input  required type="text" name='city' onChange={oncChangeHandler} value={data.city} placeholder="City" />
          <input  required type="text" name='state' onChange={oncChangeHandler} value={data.state}  placeholder="State"/>
        </div>
           <div className="multi-field">
          <input  required type="text" name='zipcode' onChange={oncChangeHandler} value={data.zipcode} placeholder="Zip Code" />
          <input  required type="text" name='country' onChange={oncChangeHandler} value={data.country}  placeholder="Country"/>
        </div>
        <input  required type="text" name='phone' onChange={oncChangeHandler} value={data.phone} placeholder="Phone"/>

      </div>
      <div className="place-order-right">
          <div className="cart-total">
          <h2>Cart Total</h2>
       
        <div className="cart-total-details">
          <p>Subtotal</p>
          <p>{getTotalCartAmount()}</p>

        </div>
        <hr />
        <div className="cart-total-details">
          <p>Delivery fee</p>
          <p>#{getTotalCartAmount()===0?0:200}</p>
          
        </div>
        <hr />
        <div className="cart-total-details">
          <b>Total</b>
          <b>#{getTotalCartAmount()===0?0:getTotalCartAmount()+200}</b>
          </div> 
           <button type="submit">PROCEED TO PAYMENT NOW</button>
        </div>
        
      </div>

      
    </form>
  )
}

export default PlaceOrder
