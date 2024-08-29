
import Navbar from './component/Navbar/Navbar'
import Sidebar from './component/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add/add'
import List from './pages/List/List'
import Order from './pages/Order/Order'
// I went to toastify website and i copied this two code and paste it in App.jsx for notification purpose//
 import { ToastContainer} from 'react-toastify';    // from toastify
  import 'react-toastify/dist/ReactToastify.css';           // from toastify Next: Go down and mount tostify contianer//Then go to add.jsx to use it.

const App = () => {

  // We are defining the url of both add.jsx and list.jsx in this place  // Then we go down to pass it in each route//Then go to add.jsx  and list.jsx to destructure it

  //const url = "http://localhost:4000";//
  const url = "https://foodbank-backend.onrender.com"

  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <hr />
      <div className="admin-content">
        <Sidebar />
        {/*Creating Rout for the Three (ADD,LIST and ORDER) */}
        <Routes>
          <Route path="/add" element={<Add url={url} />}></Route>
          <Route path="/list" element={<List url={url} />}></Route>
          <Route path="/Orders" element={<Order url={url} />}></Route>

        </Routes>
      </div>
    </div>
  )
}

export default App
