
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Body from "./Body"
import Navbar from "./Navbar"
import Login from "./Login"


function App() {
  return (
    <>
      <div>
        <BrowserRouter>
        <Routes>
          {/* rendering body component, and inside routing my login component */}
          <Route path="/" element={<Body/>} > 
            <Route path = "login" element = {<Login/>}/>
          </Route>
          <Route path="/login" element={<h1 className="h-6 font-bold text-blue-600">Login Page</h1>} />
          <Route path="/signup" element={<h1 className="h-6 font-bold text-blue-600">Signup Page</h1>} />
                 
        </Routes>
        </BrowserRouter>
       
      {/* <Navbar/> */}
      </div>
    </>
  )
}

export default App
