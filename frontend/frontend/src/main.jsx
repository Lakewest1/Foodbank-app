
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import StoreContextProvider from './context/StoreContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider>           {/*---WE wrap our storecontext bcos anything inside context can be seen by all component*/}
       <App />
    </StoreContextProvider>
 
 </BrowserRouter>
    

)
