const baseURL = "http://127.0.0.1:4001"

export const getHelper = async (endpoint) => {
  const res = await fetch(`${baseURL}${endpoint}`)
  const data = await res.json()
  return data
}

export const postHelper = async (endpoint, collection) => {
  const res = await fetch(`${baseURL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(collection)
  })
  const data = await res.json()
  return data
}

export const deleteHelper = async (endpoint, id) => {
  const res = await fetch(`${baseURL}${endpoint}${id}`, {
    method: "DELETE"
  })
  // const data = await res.json()
  return res
}

export const putHelper = async (endpoint, collection) => {
  const res = await fetch(`${baseURL}${endpoint}${collection._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(collection)
  })
  const data = await res.json() //return updated item
  return data
}
