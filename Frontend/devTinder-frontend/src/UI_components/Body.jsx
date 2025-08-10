import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Body = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/>
        {/* The Outlet component is used to render child routes */}
        {/* <Footer/> */}
    </div>
  )
}

export default Body