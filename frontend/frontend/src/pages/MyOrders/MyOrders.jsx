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
    const response = await axios.post(
      `${url}/api/order/userorders`, 
      {}, 
      { headers: { Authorization: `Bearer ${token}` } } // Assuming 'token' is a Bearer token
    );

    if (response.status === 200) {
      setData(response.data.data);
      console.log(response.data.data);
    } else {
      setError(`Failed to fetch orders: ${response.statusText}`);
    }
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      setError(`Failed to fetch orders: ${error.response.statusText}`);
    } else if (error.request) {
      // The request was made but no response was received
      setError('Failed to fetch orders: No response received');
    } else {
      // Something happened in setting up the request that triggered an Error
      setError(`Failed to fetch orders: ${error.message}`);
    }
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
      {error && <div className="error-message">{error}</div>}
      <div className="Container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="" />
            <p>{order.items.map((item, i) => (
              i === order.items.length - 1
                ? `${item.name} x ${item.quantity}`
                : `${item.name} x ${item.quantity}, `
            ))}</p>
            <p>#{order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
            <button onClick={fetchOrders}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );

};
export default MyOrders;