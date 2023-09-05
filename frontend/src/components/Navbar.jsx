import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import UserContext from "../contexts/UserContext"

const Navbar = () => {
  const { loaded, user } = useContext(UserContext)
  const style = { display: "flex", justifyContent: "space-evenly" }

  if (!loaded) {
    return null
  }

  const views = {
    loggedIn: [
      { link: "/", text: "Home" },
      { link: "/tasks", text: "View all tasks" },
      { link: "/tasks/new", text: "Add task" },
      { link: "/archive", text: "Archive" }
    ],
    default: [
      { link: "/login", text: "Log in" },
      { link: "/signup", text: "Sign up" }
    ]
  }

  const currentView = user.isLoggedIn ? views.loggedIn : views.default

  return (
    <nav style={style}>
      {currentView.map((opt) => (
        <NavLink key={opt.text} to={opt.link}>
          {opt.text}
        </NavLink>
      ))}
    </nav>
  )
}

export default Navbar
