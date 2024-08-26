import './Navbar.css'
import {assets} from '../../assets/assets/assets'

const Navbar = () => {
  return (
    <div>
      <div className="navbar">
        <img className='logo' src={assets.Grova2} alt="" />
        <a href="">Food Bank Admin Page</a>
        <img className='profile' src={assets.lakewest} alt="" />
      </div>
    </div>
  )
}

export default Navbar
