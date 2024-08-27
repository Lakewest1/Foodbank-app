import { useContext} from 'react';
import { assets } from '../../assets/assets';
import './FoodItem.css'
import PropTypes from 'prop-types';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const FoodItem = ({ id, name, price, description, image }) => {
  {/*-Now we are distructuring the food id,name,image,price// To make image show we imported url so we can get it from context// Then go down and append the url to the image*/ }
  
  // since the url creted in storeContext has image so i fertch from UseContext//
  const { url } = useContext(StoreContext)


  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext); {/*Here we are mounting the cartItem,setCartItem,addTocart and removeFRomCart that we created inside the StoreContext.jsx*/ }
  
  const navigate = useNavigate();
  return (
    <div className='fooditem'>
      <div className="food-item-img-container">
        <img  className='food-img' src={url+"/images/"+image} alt="" />
        {/*We will use logic to add item to cart// it says if item is in d cart is not equal to zero den add plus(+) */}
        {!cartItems[id]                                          
          ? <img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" />
          : <div className='food-item-counter'>
            <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
            <p>{cartItems[id]}</p>
            <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
            
          </div>
        }

      </div>
      <div className="food-info">
        <div className="food-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <div className="price-cart">
          <p className="food-item-price">#{price}</p>
          <img  onClick={() => navigate('/cart')}  src={assets.bag_icon} alt="" />
        </div>
        
      
      </div>
      
    </div>
  )
};
// Define prop types for validation
FoodItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
   url: PropTypes.string.isRequired,
};


export default FoodItem
