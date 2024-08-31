import './Footer.css'
import { assets } from '../../assets/assets.js'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  
  return (
    <div className='Footer' id='Footer'>
      <div className="Footer-content">
        <div className="Footer-left">
          <img src={assets.Grova2} alt=""  className='footer-img'/>
          <p>Food bank is one of the best order and delivery Food in Nigeria.Our food are topnotch and Nutricious to the core.We remain the best online food bank in your territory.Our customers are our major priority and credibility.We have been into Ecommerce for more than 3years.Our delivery is fast and Cheap. </p>
          <a href="https://wa.me/message/HK5AY74WUVJ4B1"><button>Need Help ? Call Us</button></a>
          <div className="soc-icon">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>

        <div className="Footer-Center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
          
        </div>
      

        <div className="Footer-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+234 8179343765</li>
            <li>Contact Olamilake95@gmail.com</li>

          </ul>

          
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 @ Musa Olalekan Ismail (L@kewe$t) - All Right Reserved.
      </p>
      
    </div>
  )
}

export default Footer
