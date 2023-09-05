import React, { useContext } from "react"
import { Outlet, Navigate } from "react-router-dom"
import UserContext from "../contexts/UserContext"

const IntroRoute = () => {
  const { user, loaded } = useContext(UserContext)

  if (!loaded) {
    return <p>Loading...</p>
  }

  if (user.isLoggedIn) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export default IntroRoute
