import {useContext, useState, } from 'react'
import './LoginPopup.css'
import { assets} from '../../assets/assets.js'
import { StoreContext } from '../../context/StoreContext.jsx'
import axios from 'axios'
import PropTypes from 'prop-types';

const LoginPopup = ({setShowLogin}) => {

  // Fetching the url from Store context so we can use it here too//
  const { url } = useContext(StoreContext)              // Now we can use this url for the login components//Bt let !st create login function
  
  const {setToken } = useContext(StoreContext)  // Fetch from use Context
  
  const [currState, setCurrState] = useState("Login")

  // To link this frontend to the backend we cretated we are going to create one useState  to save the username,email and password//
  const [data, setData] = useState({
    // We will initialize it with one object//
    name: "",
    email: "",
    password: ""
  })
  // Now wie will crete unchange handler function for each input text//
  const onChangeHandler = (event) => {
    // We will use the event.target.name to get the name type inside input//
    const name = event.target.name;
    const value = event.target.value;                                  // We have extracted the name and value from the input field//
    // Now we will update the value of the useState with new value//
    setData(data => ({ ...data,[name]: value }))    //We get previous data,we put new name and it values  // Now we will go down and link the onchangeHandler
    
  }
      /* Let test if as we type name,email and password it will be catch using useEffect//
    useEffect(() => {
      console.log(data)
    }, [data]) */  // since it is working  let go to the context follder//
  
  // Now we will create a function to handle the login since we have link the backrnd port to it//
  const onLogIn = async (event) => {          // Go down and link this function to the form fisst b// then go to d btn and added submit//
    event.preventDefault();                        // let prevent the page from reloaded//
    // Let add the logic to call the backend Api// Bt to do this we need axios support // let install it in terminal
    let newUrl = url;             // We created one copy of the url from backend//
    if (currState === 'Login') {
      newUrl += "/api/user/login"     // if it is cuurent state is login// Then connect to backend user login//
    }
    else {
      newUrl +="/api/user/register"     // if the cuurent state is not login// Then connect to backend user register//
    }
    // Nw we will call the api// bt first we will first import axios at the top//
    const response = await axios.post(newUrl, data)     // we have connected both login and register to backend
    // Now we will check if the response is ok or not//
    if (response.data.success) {
      // We wil get one token//     // Now go back to storeContext and crete useState where we will store user token//
      setToken(response.data.token)   // we get token//
      // let save our token inside local storage for easy access//
      localStorage.setItem('token', response.data.token)               //===Local Storage oooo//
      // After we have login we will use the ShowLogin to hide the btn//
      setShowLogin(false)                                             // this will hide it//

    }
    else {
      alert(response.data.message)
    }
  }
  return (
    <div className='Login-popup' id='Login'>
      <form onSubmit={onLogIn} className="login-container">
        <div className="login-title">
          <h2>{currState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
          {currState==="Login"?<></>: <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Enter Your Name' required />} {/*I dont want name to display on log in */}

          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Enter Your Email' required />
             <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Enter Your password' required />
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
        
        <div className="login-pop-condition">
          <input type="checkbox" required />
          <p>By Continuing, I agree to the terms of use and privacy</p>
        </div>
        <div className="condition-btm">
        {currState === "Login"
          ? <p >Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>          // If current state is login show this//
          :
             <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login</span></p>           // If current state is not login show this//
          }
        </div>
       
        
      </form>
    </div>
 
  )
}
// prop validation//
LoginPopup.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};
export default LoginPopup
