import { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

 const fetchOrders = async () => {
  try {
    const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
    if (response.status === 200) {
      setData(response.data.data);
      console.log(response.data.data);
    } else {
      setError(`Failed to fetch orders: ${response.statusText}`);
    }
  } catch (error) {
    setError(`Failed to fetch orders: ${error.message}`);
  }
};


    useEffect(() => {
    if (token) {     // If token is available//
      fetchOrders();
    }
  }, [token]);



  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="Container">
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>{order.items.map((item, index) => {
                // if items quantity is 2//
                                    if (index === order.items.length - 1) {
                        // This will be the last item in our array
                        return item.name + " x " + item.quantity;
                      } else {
                        // Add a comma after all items except the last one
                        return item.name + " x " + item.quantity + " , ";
                      }

              })}</p>
              <p>#{order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p><span>&#x25cf;</span> <b>{order.status}</b></p>
              <button onClick={fetchOrders}>Track Order</button>
             </div>
           )
        }
        )}
      </div>
      
    </div>
  );
};

export default MyOrders;