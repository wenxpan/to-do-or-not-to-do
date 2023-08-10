import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { BrowserRouter } from "react-router-dom"
import App from "../components/App.jsx"

describe("App Component", () => {
  let container
  beforeEach(() => {
    container = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    ).container
  })

  it("Renders the heading", () => {
    expect(container.querySelector("h1")).not.toBeNull()
    expect(container.querySelector("h1")).toHaveTextContent(
      "To do or not to do"
    )
  })
})
