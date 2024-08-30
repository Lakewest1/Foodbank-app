
import Navbar from './components/Navbar/Navbar'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import { useState } from 'react'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
// For google Tracking//

//import ReactGA from 'react-ga';


/* Initialize Google Analytics
ReactGA.initialize('G-KE0NBEKGBG');

// Track page views
ReactGA.pageview(window.location.pathname + window.location.search);*/

const App = () => {

  const [showLogin, setShowLogin] = useState(false); // State for login popup

  return (
  <>
  {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}                              {/*-If show login is true display loginpop up else dont display*/}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />                   {/*---passing the setShowlogin function so we can destructure it in Navbar comp*/}
      {/*---Setting up routes for Home,Cart, and placeorder pages*/}
      <Routes>
        <Route path='/' element={<Home/>} />                {/*---Route for Home page*/}
        <Route path='/Cart' element={<Cart/>} />                  {/*---Route for Cart page*/}
          <Route path='/order' element={<PlaceOrder />} />             {/*---Route for PlaceOrder page*/}
           <Route path='/verify' element={<Verify/>} />             {/*---Route for Verify page*/}
            <Route path='/myorders' element={<MyOrders/>} />             {/*---Route for MyOrder page*/}
      </Routes>
    </div>   
        <Footer />
  </>    
    
    
  )
}
      

export default App
