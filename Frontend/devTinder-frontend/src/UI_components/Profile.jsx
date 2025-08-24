import React from 'react'
import { useSelector } from 'react-redux'
import EditProfile from './editProfile'

const Profile = () => {
  const user = useSelector((store) => store.user)

  return (
    user && (
      <div className="min-h-screen bg-purple-100 ">
          <EditProfile user = {user}/>
      </div>
    )
  )
}

export default Profile