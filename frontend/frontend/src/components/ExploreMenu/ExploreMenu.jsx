import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';
import PropTypes from 'prop-types'; // Import PropTypes

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='Explore-menu' id='explore-menu'>
      <h1>Explore Our Menu</h1>
      <p className='explore-menu-text'>Choose from a diverse menu featuring a palatable set of dishes crafted with the best ingredients and culinary skills. Satisfy your dining experience with a superb meal at a time.</p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div 
            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} 
            key={index} 
            className="menu-list-item"
          >
            <img 
              className={category === item.menu_name ? "active" : ""} 
              src={item.menu_image} 
              alt={`Image of ${item.menu_name}`} 
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

// Define prop types for validation
ExploreMenu.propTypes = {
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired
};

export default ExploreMenu;
