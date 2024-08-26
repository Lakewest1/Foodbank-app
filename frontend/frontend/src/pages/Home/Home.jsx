
import Header from '../../components/Header/Header'
import './Home.css'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import {useState} from 'react'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import ChefSlider from '../../components/ChefSlider/ChefSlider'

import AppDownload from '../../components/AppDowload/AppDownload'

const Home = () => {
 const [category,setCategory] = useState("All")


  return (
    <>
    <div>
      <Header />                              {/*---We Mount the Header component inside this Home page */} 
       <ChefSlider/>
      <ExploreMenu category={category} setCategory={setCategory} />                          {/*---We Mount the ExploreMenu that we map in the asset array component inside this Home page + category and set Category as props*/}    
        <FoodDisplay category={category} />        {/*---We Mount the food display that fetch foodITem  and pass category as props*/}  
        
      <AppDownload/>
    </div>
     
      </>
  )
}

export default Home;

