import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';

  import { ToastContainer} from 'react-toastify'; // WE copy and paste this from react toastify website// This is for Added food notification
  import 'react-toastify/dist/ReactToastify.css';   // WE copy and paste this from react toastify website// 

const App = () => {

  const url = 'http://localhost:4000' // We call the Api for all the Food Add and and Food List//
  
  return (
    <div>
      <ToastContainer />  {/*--WE mounted the toast container----*/}
      
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/Add" element={<Add url={url} />} />
          <Route path="/List" element={<List url={url } />}/>
          <Route path="/Orders" element={<Orders url={url} />}/>
        </Routes>
      </div>
      
    </div>
  )
}

export default App
