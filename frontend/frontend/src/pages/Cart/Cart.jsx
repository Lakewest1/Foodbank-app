import { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  // Access our cartItems, food_list, removeFromCart from StoreContext
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  
  // To navigation link to the proceed button here//
  const navigate = useNavigate();

  // To make the image from databse to display in the cart too//
  const {url} = useContext(StoreContext)
  
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          // Check if the item is in the cart
          if (cartItems[item._id] > 0) {
            return (
              <>
              <div className="cart-items-title cart-items-item" key={item._id}>
                <img src={url + "/images/" + item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>#{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>#{item.price * cartItems[item._id]}</p>
                <p className="cross" onClick={()=>removeFromCart(item._id)}>X</p>
               
              </div>
                <hr />
                </>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
       
        <div className="cart-total-details">
          <p>Subtotal</p>
          <p>{getTotalCartAmount()}</p>   {/*To make it display the total weda zero or more price */}

        </div>
        <hr />
        <div className="cart-total-details">
          <p>Delivery fee</p>
          <p>#{getTotalCartAmount()===0?0:200}</p>                    {/*If total is equal to zero show zero if not show delivery fee */}
          
        </div>
        <hr />
        <div className="cart-total-details">
          <b>Total</b>
          <b>#{getTotalCartAmount()===0?0:getTotalCartAmount()+200}</b>   {/*If total is equal to zero show zero if not get total and add charges */}
          </div> 
           <button onClick={()=>navigate('/order')}>PROCEED TO CHECK-OUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you already have a promo code,enter it here</p>
            <div className="cart-promo-inpu">
              <input type="text" placeholder="Your promo code" />
              <button>Submit</button>
            </div>
          </div>
          
        </div>
        
      </div>
      
    </div>
  );
};

export default Cart;
