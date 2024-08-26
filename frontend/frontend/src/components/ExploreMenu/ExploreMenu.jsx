import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
import PropTypes from 'prop-types'; // Import PropTypes

const ExploreMenu = ({ category, setCategory }) => {  // Props validation is added here
  return (
    <div className='Explore-menu' id='explore-menu'>
      <h1>Explore Our Menu</h1>
      <p className='explore-menu-text'>Choose from a diverse menu featuring a palatable set of dishes crafted with the best ingredient and culinary .Satify Your dining experience with a super meal at a time.</p>
      <div className="explore-menu-list">  {/*-- We will render the menu_list  we imported using map method */}
        {menu_list.map((item, index) => {  {/*-- Here I map all the food in menu list here I gave it item, index */}
          return (
            <div  onClick={() => { setCategory(prev => prev === item.menu_name ? "All" : item.menu_name) }} key={index} className="menu-list-item">               {/*-- We pass the function index to do the mapping// we pass the props and compare it so it can display All food is it is same as prev or display food base on category name */}
              <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />          {/*-- We here we are displaying all the image in the array in assets.js */}
              <p>{item.menu_name}</p>                           {/*--  We are displaying all the names of food in the array in assets.js */}
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}

// Define prop types for validation
ExploreMenu.propTypes = {
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired
};

export default ExploreMenu;
