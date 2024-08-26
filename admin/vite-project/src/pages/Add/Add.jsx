import { useState } from "react"
import { assets } from "../../assets/assets/assets"
import "./add.css"
import axios from "axios"
import { toast } from "react-toastify"

const add = ({url}) => {    // We detructure the url gotten from app,jsx

  /* declaring variable for backend url so we can connect to it//  NB second to last step//
  const url = "http://localhost:4000";*/
  
// For the image upload//
  const [image, setImage] = useState(false)
  
  // Creating more useState for name, category and price//
  const [data, setData] = useState({
    // we are setting default for name,descriptipn,category and price //
    name: "",
    description: "",
    price: "",
    category: "Salad",
    
    
  })
  // let create onchange Handler function for name//
  const onchangeHandler = (event) => {
    // Now let catch the name as the person type it//
    const name = event.target.name;
    // to extract Value //
    const value = event.target.value
    // Now carry the setData function come//
    setData(data=>({...data,[name]:value}))    /// We first get the previous data,we provide field name and update it with new value from function
  }
  // NOw let make The Api call so that when will press submit  btn it will upload it//
  const onSubmitHandler = async () => {
    // After trying to click the btn,the page reloaded to prevent it//
    event.preventDefault();
    // Now we want to put name,description,category and price into one form.So we need to create new form//
    const formData = new FormData();                // this will help to create new form
    // now let put all our data inside the form created in db//
    formData.append("name", data.name)               // for name     
    formData.append("description", data.description)               // for description//
    formData.append("price", Number(data.price))  // for price bt since at line 15 up we declare price as string so we must convert it to Num 
    formData.append("category", data.category)               // for category   
    formData.append("image", image)               // for image
    
    // Now  go and run ur server for backend and connect this frontend to backend//

    // Since our server is running fine now let do the APi call and connect front end to backend using Axios== NB= import axios oo//
    const response = await axios.post(`${url}/api/food/add`, formData)  // we added the api and send FormData//
    
    // Checking if response is success or false//
    if (response.data.success) {
      setData(
        // Paste the data u created up//
        {
    name: "",
    description: "",
    price: "",
    category: "Salad",
  }
      )
      setImage(false)

      // aftter we have imported the tostify to app.jsx now let use it here=====//
      toast.success("Food added to database")  // this will display the res (i.e message) from the backend
    }
    else {
       toast.error("Food was not added to database") 
    }

        

  }
  
  







  /* To test if our data is getting uploaded as we type// The we remove it after checking the console//
  useEffect(() => {
    console.log(data)
  }, [data])
  */
  return (
    <div className="add">
      <form className="add-col" onSubmit={onSubmitHandler}>    {/*--For the form to submit we added the onsubmitHandler function*/}     
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
          <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />  {/*--To make the image icon take us to where we can select image of food*/}
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file"  id="image" hidden required/>
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onchangeHandler} value={data.name} type="text" name="name"  placeholder="Type name here" required/>
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onchangeHandler} value={data.description}  name="description"  rows="6" placeholder="Write content here" required id=""></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col" >
            <p>Product Category</p>
            <select onChange={onchangeHandler} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desert">Desert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="pure veg">Pur Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
              <option value="Jollof">Jollof</option>
              <option value="Amala">Amala</option>
            </select>

          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onchangeHandler} value={data.price} type="Number" name="price" placeholder="#2500"/>
            
          </div>
        </div>
        <button type="submit" className="add-btn">Add Food</button>
      </form>
      
      
    </div>
  )
}

export default add
