const baseURL = "http://127.0.0.1:4001"

export const getHelper = async (endpoint) => {
  const res = await fetch(`${baseURL}${endpoint}`, { credentials: "include" })
  const data = await res.json()
  return data
}

export const postHelper = async (endpoint, body) => {
  const res = await fetch(`${baseURL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include"
  })
  const data = await res.json()
  return data
}

export const deleteHelper = async (endpoint) => {
  const res = await fetch(`${baseURL}${endpoint}`, {
    method: "DELETE",
    credentials: "include"
  })
  // const data = await res.json()
  return res
}

export const putHelper = async (endpoint, body) => {
  const res = await fetch(`${baseURL}${endpoint}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include"
  })
  const data = await res.json() //return updated item
  return data
}
