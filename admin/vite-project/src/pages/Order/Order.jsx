import { useEffect, useState } from "react"
import "./Order.css"
import { toast } from "react-toastify"
import axios from "axios"
import { assets } from "../../assets/assets/assets"


const Order = ({url}) => {   // We  got the url from app.jsx as props
  // Let create  a state to store the orders from backend//
  const [orders, setOrders] = useState([])
  
  // Now let fetch the orders from backend//
  const fetchAllOrders = async () => {
    // Now let connect to the backend//
    const response = await axios.get(url + "/api/order/list")  //Since it is get we dont have to pass headers and body//
    if (response.data.success) {   // if we get the order data//
      // Then we set the orders with the new data//
      setOrders(response.data.data);
      console.log(response.data.data)
      
    }
    else {
      toast.error("Error")
    }
  }






  // We have to get all orders data wenever page is reloaded//
  useEffect(() => {
    fetchAllOrders()
  }, [])
 

  // To update Order and handle it in admin page//
  const statusHandler = async (event, orderId) => {   // Now go down and link this function to selct sttus.//
    // Let check if wen we select it , it is updated in backend//
    //console.log(event, orderId);   // We are getting the event and order id in the console//
    // Let call the api so wenver we change in front end it is updated in backend//
    const response = await axios.post(url + "/api/order/status", {
      // in the body let fisrt save the orderId//
      orderId,
      status: event.target.value // we are getting the status value//

    })
    if (response.data.success) {
      // we will fetchall orders and refresh the page//
      await fetchAllOrders();
    }

    
  }

  return (
    <div className="Order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => {
          return (  // Added 'return' here
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, itemIndex) => {
                    if (itemIndex === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
                </p>
                <p className="order-item-name">{order.address.firstName + "  " + order.address.lastName}</p>
                <div className="order-item-address">
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + "," + order.address.state + ", " + order.address.country + "," +order.address.zipcode}</p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
                </div>
                <p>Items: {order.items.length}</p>
                <p>#{order.amount}</p>
                {/*We wan to add select item so we can change the status */}
                <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            
          );
        })}
      </div>
    </div>
  )
};


  export default Order;
