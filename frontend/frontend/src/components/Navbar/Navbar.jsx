import  { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import PropTypes from 'prop-types';

const Navbar = ({setShowLogin}) => {              {/*we deetructure the set shwlogin here so Navbar can use it */}

  // To create underline hover for list we will use usestate//
  
  const [menu,setMenu] = useState("Menu")

  // To create the dot color on basket gto show there is something inside the cart//
  const { getTotalCartAmount,token,setToken } = useContext(StoreContext);     // we ant to hide the sign in btn so we pass token,setToken//

  // For log after the users have login// Let create a  logout function//
  const logOut = () => {         // Scroll down and add the function to the li//
    // To log out we have to remove the token from localStorage//
    localStorage.removeItem("token");  
    setToken("");
    // When the user logout let send them back to the home page//
    window.location.href = "/"        // We can also use navigate//
  }
 
  // For My order navigation//
  const navigate= useNavigate()


  return (
    <div className='Navbar'>
      <Link to="/"><img className='logo' src={assets.Grova2} alt="" /></Link>
      <Link to="/"><h1 className='beat'>Food-Bank</h1></Link>
      
        <ul className='navbar-menu'>
          <Link to="/" onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>Home</Link>       {/*-If our menu is home it will be active else it should not*/}      
        <a href='#explore-menu' onClick={()=>setMenu("Menu")} className={menu === "Menu"?"active":""}>Menu</a>         {/*-Then we added onclick so it can be underlined after clicked*/}  
          <a href='#app-download'onClick={()=>setMenu("Mobile-App")} className={menu === "Mobile-App"?"active":""}>Mobile-App</a>
          <a href='#Footer' onClick={()=>setMenu("Contact")} className={menu === "Contact"?"active":""}>Contact Us</a>
        </ul>
      <div className="navbar-right">
        <img className='search' src={assets.search_icon} alt="" />
        <div className="navbar-basket">
        <Link to={'/cart'}><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount()===0?"<></>":"dot"}></div>
          </div>
        {/*We want to hide the sign in btn so we will check if the token is available,if not we will show the btn*/}
        {!token ? <button className='btn' onClick={() => setShowLogin(true)}>Sign in</button>    
        :<div className="navbar-profile" >
          <img src={assets.profile_icon} alt="" />
          <ul className="nav-profile-drop-down">
            <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" />Orders</li>
            <hr />
            <li onClick={logOut}><img src={assets.logout_icon} alt="" />LogOut</li>
          </ul>

        </div>
        }
         
          </div>
     

      
    </div>
  )
}
Navbar.propTypes = {
  setShowLogin: PropTypes.func.isRequired, // Ensure it's a function and required
};
export default Navbar
