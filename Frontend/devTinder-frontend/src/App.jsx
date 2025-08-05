
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Body from "./Body"
import Navbar from "./Navbar"
import Login from "./Login"
import Profile from "./Profile"


function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            {/* rendering body component, and inside routing my login component */}
            <Route path="/" element={<Body/>} > 
              <Route path = "login" element = {<Login/>}/>
              <Route path = "profile" element = {<Profile/>}/>
            </Route>                 
          </Routes>
        </BrowserRouter>
       
      {/* <Navbar/> */}
      </div>
    </>
  )
}

export default App
