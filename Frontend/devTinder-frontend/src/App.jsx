
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Body from "./Body"
import Navbar from "./Navbar"
import Login from "./Login"
import Profile from "./Profile"
import {Provider} from 'react-redux';


function App() {
  return (
    <>
      <div>
        <Provider>
          <BrowserRouter basename="/">
            <Routes>
              {/* rendering body component, and inside routing my login component */}
              <Route path="/" element={<Body/>} > 
                <Route path = "login" element = {<Login/>}/>
                <Route path = "profile" element = {<Profile/>}/>
              </Route>                 
            </Routes>
          </BrowserRouter>
        </Provider>
       
      {/* <Navbar/> */}
      </div>
    </>
  )
}

export default App
