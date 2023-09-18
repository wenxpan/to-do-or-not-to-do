import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import UserContext from "../contexts/UserContext"
import LogOutButton from "./LogOutButton"

const Navbar = () => {
  const { loaded, user } = useContext(UserContext)

  if (!loaded) {
    return null
  }

  const views = {
    loggedIn: [
      ["/account", "Home"],
      ["/tasks", "View all tasks"],
      ["/tasks/new", "Add task"],
      ["/archive", "Archive"]
    ],
    default: [
      ["/login", "Log In"],
      ["/signup", "Sign Up"]
    ]
  }

  const currentView = user.isLoggedIn ? views.loggedIn : views.default

  return (
    <div>
      <nav className="flex-col flex-grow hidden pb-4 md:pb-0 md:flex md:justify-end md:flex-row">
        <a></a>
        {currentView.map(([url, title]) => (
          <NavLink
            key={title}
            to={url}
            className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
          >
            {title}
          </NavLink>
        ))}
        {user.isLoggedIn && <LogOutButton />}
      </nav>
    </div>
  )
}

export default Navbar
