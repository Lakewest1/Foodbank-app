import { useEffect, useState } from "react"
import "./List.css"
import axios from "axios";
import { toast } from "react-toastify";

const List = ({url}) => {    // also destructure url here to use the url from app.jsx

  /* creating variable for backend port:4000 so we can get data from there and show it on our list page//
  const url = "http://localhost:4000"*/

  // First we will store all the food from database inside one variable//
  const [list, setList] = useState([]);

  //Now we will create fetch to fetch from db //
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)  // the food from the backend port4000 we appended(added it) to list page using axios
       
    /* Let test if we are getting the data from db
    console.log(response.data);
    */
   
    
    //Nw let give condition incase the food was not gotten from backend dat is connected to db//
    if (response.data.success) {     // data is loded inside the port 4000 backend
      setList(response.data.data)    // Then the food should be loaded in LIst

   

    }
    else {
      toast.error("Error")
    }

  }

  // To remove item from list by pressing cross or x//
  const removeFood = async (foodId) => {
   /*  We are testing if we were able to get foodid 
   console.log(foodId) */
    // Since it work let call the Api to delete food from the databse//
    const response = await axios.post(`${url}/api/food/remove`,{ id:foodId })  //we added the foodid to delete it//

    // After the food is deleted we need to refresh it with new food//
    await fetchList();       //we fetch it again after deleted //

    //we will now add notification so the users can see that it has been deleted //
    if (response.data.success) {
      toast.success(response.data.message)
    }
    else {
      toast.error("error")
    }
    
  }

  // We want to run the function underground whenever the page is reloaded//
  useEffect(() => {
    fetchList();            // call the fetchlist function so once page is loaded it will fetch food
  },[])
  return (
    <div className="list add flex-col">
      <h2>All Foods List</h2>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" /> {/*Got image from image storage engine and display it here */}
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>#{item.price}</p>
              <p className="cursor" onClick={()=>removeFood(item._id)}>X</p>

            </div>
          )
        })}
      </div>
      
    </div>
  )
}

export default List
