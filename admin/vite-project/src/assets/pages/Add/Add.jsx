import React, { useState } from 'react';
import "./Add.css";
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
/*import { useEffect } from 'react';*/

const Add = ({url}) => {  // We destructure the url in props for Add so we can used the url in App.jsx//

//  const url = 'http://localhost:4000'; // calling the URL for the backend // We remove this and put it in APP jsx

  const [image, setImage] = useState(null);    {/*State for the icon to change to image after image is uploaded at line 72*/}

  
  const [data, setData] = useState({
    name: '',                          // Default is empty when reload//
    description: '',                    // Default is empty when reload//
    price: '',                          // Default is empty when reload//
    category: 'Salad'                 // to make salad be the default category when we reload the page//
  });



  // To call the API for the updated data inside the input
  const onSubmitHandler = async (event) => {
    event.preventDefault();            // To prevent reload

    // To insert all our data inside the useState above.That is this is the form table for our food inside the database//
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));  //We converted the price string to number and Ensure the price is a number
    formData.append('category', data.category);
    formData.append('image', image);

    try {
      // Let's call the API using axios so the food can be posted in the Database and server//
      const response = await axios.post(`${url}/api/food/add`, formData);

      // To check if response is success or fail
      if (response.data.success) {
        setData({
          name: '',
          description: '',
          price: '',
          category: 'Salad'   // If foods are uploaded the data should reset back to normal,Only salad will be shown others will be empty//
        });
        setImage(false); // it setImage should reset to null or an empty string too//

        toast.success(response.data.message) // We called the toast to work when food is added//


      } else {
        // If error occur i.e food is not uploaded it will display toastify error//
        toast.error( response.data.message);
      }
    } catch (error) {
      // Handle any other errors that may occur during the API call
      console.error('Error while adding food item:', error);
    }
  };

  
    // To extract text from all the input boxes when text is typed in check line 82,92,105//
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;                 // To  extract the value//
    setData(data => ({ ...data, [name]: value }));    // To set the new value entered and update it//
  };

  /*To check if our data is getting updated after input text we will use useEffect//
  useEffect(() => {
    console.log(data)
  },[data])
  */

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />    {/*--If image is available show it on the icon*/}
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' name='image' hidden required />   {/*--To make the image icon take us to where we can select image of food*/}
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Enter name of food here' required />
        </div>

        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category" value={data.category}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desert">Desert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='#1500' required />
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  );
};

export default Add;
