import React from "react"
import { NavLink } from "react-router-dom"

const Navbar = () => {
  const style = { display: "flex", justifyContent: "space-evenly" }

  return (
    <nav style={style}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/tasks">View all tasks</NavLink>
      <NavLink to="/tasks/new">Add task</NavLink>
      <NavLink to="/archive">Archive</NavLink>
    </nav>
  )
}

export default Navbar
