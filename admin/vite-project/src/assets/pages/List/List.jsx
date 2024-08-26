import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({url}) => {  // We destructure  so we can use the URL in App.jsx

  //const url = 'http://localhost:4000';// We remove this and put it in APP jsx

  const [list, setList] = useState([]);
  // To fetch from srver do it can display in list page//
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    // let check if we are getting response//
    //console.log(response.data)

    if (response.data.success) {
      setList(response.data.data);  // To save the food gooten from the Database
       //toast.success('Food is available in the list')  // To display notification for the list
    }
    else {
      toast.error('Error fetching the food list')   //If we dont get the food toast we display error for us//
    }
    
  }
  // To remove Food from food list-----------------------------------//

const removeFood = async(foodId) => {  // We pass the food id cus we are removing food by their id//
  const response = await axios.post(`${url}/api/food/remove`, { id: foodId });  // calling the foodid from the database so we can delete it//
  await fetchList();             // To display new data after one is remove//
  if (response.data.success) {
    toast.success(response.data.message)   // If the food was remove successfully toastify will display remove food
  }
  else {
    toast.error('Error in deleting the food') // if food was remove show error
  }
}


  // To display the food list when it is loaded//
  useEffect(() => {
    fetchList();
  },[])
  
  return (
    <div className='list add flex-col'>
      <p>All food Lists in The web</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {         // Note: Map is used to manipulate anything inside array e.g like doubling it,changing it //We change the value we are getting from our database to how we want it to look like in the list page using map//
          return (
            <div key={index} className='list-table-format'>
               <img src={`${url}/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>#{item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='Cursor'>X</p>  {/*---We pass removefood function and the code is in line 28*/}

            </div>
          )
        })}
      </div>
      
    </div>
  );
};

export default List
