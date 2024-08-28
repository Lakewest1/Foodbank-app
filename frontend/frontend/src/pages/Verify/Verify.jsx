import { useNavigate, useSearchParams } from "react-router-dom"
import "./Verify.css"
import { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
// Now go to the App.jsx and create the route//


const Verify = () => {

  // let create the useState to get the url Parameter and display message//
  const [searchParams,setSearchParams] = useSearchParams();

  // Now we will create two varible, Success and OrderId//
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")

  /* let test it if we get id
  console.log(success, orderId);   check console u will see it*/

  // Now we will get the backend url from storeConxt//
  const { url } = useContext(StoreContext);     // Now go down and create loader untill d payment is success//

  //To use Navigate====================//
  const navigate = useNavigate();

  // now let add the backend//
  const verifyPayment = async () => {
    const response =await axios.post(url + "/api/order/verify",{success, orderId })  // now we gat 
    if (response.data.success) {
        navigate("/myorders")
    }
    else {
      navigate("/")
    }
  }
  useEffect(() => {
    verifyPayment();
  },[verifyPayment])


  return (
    <div className="verify">            {/*Let create the spinner to show untill d payment is success */}
      <div className="spinner"></div>
      
    </div>
  )
}

export default Verify
