import React, { useContext } from "react"
import UserContext from "../contexts/UserContext"

const LogOutButton = () => {
  const { user, setUser } = useContext(UserContext)
  async function handleLogOut() {
    try {
      const res = await fetch("http://127.0.0.1:4001/logout", {
        method: "POST",
        credentials: "include"
      })
      if (res.ok) {
        setUser({ isLoggedIn: false })
      } else {
        throw new Error(res)
      }
    } catch (e) {
      console.error(e)
    }
  }
  return <button onClick={handleLogOut}>Log Out</button>
}

export default LogOutButton
