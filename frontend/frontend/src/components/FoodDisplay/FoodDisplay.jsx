import { StoreContext } from '../../context/StoreContext'
import { useContext } from 'react'
import './FoodDisplay.css'
import PropTypes from 'prop-types'; // Import PropTypes
import FoodItem from '../FoodItem/FoodItem';


const FoodDisplay = ({category}) => {
  // We will first get the food list array using the context Api
  const {food_list} = useContext(StoreContext)        // We access the food from store context

  return (     
    <div>                             {/*-After we have access the food from the store context let draw our table for food to be display----*/}
      <div className="food-display" id='food-display'>
        <h2>Top dishes near you</h2>
                                     
        <div className="food-display-list">      {/*-Now let mount our food to display it in the home page*/}
          {food_list.map((item,index) => {
            // For food to display base category we will use this logic//
            if (category === 'All' || category === item.category) {          {/*Its means if the food */}
              
                return (                  
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                price={item.price} 
                description={item.description}
                image={item.image} />
            )
            }
          
           })}                                                   {/*-Now let mount our food to display it in the home page*/}
        </div>

        
    </div>
      
    </div>
  )
}
// Define prop types for validation
FoodDisplay.propTypes = {
  category: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
  
};


export default FoodDisplay
