
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Body from "./UI_components/Body.jsx"
import Feed from "./UI_components/Feed.jsx"
import Login from "./UI_components/Login.jsx"
import Profile from "./UI_components/Profile.jsx"
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js"; // Import the store


function App() {
  return (
    <>
      <div>
        <Provider store ={appStore}>
          <BrowserRouter basename="/">
            <Routes>
              {/* rendering body component, and inside routing my login component */}
              <Route path="/" element={<Body/>} > 
                <Route path = "/" element = {<Feed/>}/>
                <Route path = "/login" element = {<Login/>}/>
                <Route path = "/profile" element = {<Profile/>}/>
              </Route>                 
            </Routes>
          </BrowserRouter>
        </Provider>
       
      
      </div>
    </>
  )
}

export default App
