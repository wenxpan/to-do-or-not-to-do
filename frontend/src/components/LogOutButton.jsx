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
  return (
    <button
      onClick={handleLogOut}
      className="flex flex-row text-gray-900 bg-gray-200 items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-red-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
    >
      Log Out
    </button>
  )
}

export default LogOutButton
