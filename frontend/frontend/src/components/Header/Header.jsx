import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import './Header.css'

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className='header'>
      <div className="Explore">
        <h1>Order for your Favourite food here!</h1>
        <p>Choose from a diverse menu featuring a palatable set of dishes crafted with the best ingredient and culinary .Satisfy Your dinning experience with a super meal at a time.</p>
        <button onClick={navigate('/#explore-menu')}>View Menu</button>
      </div>
      <div className="Right-img">
        <img src={assets.baner} alt="" />
        
      </div>
      
      
    </div>
  )
}

export default Header
