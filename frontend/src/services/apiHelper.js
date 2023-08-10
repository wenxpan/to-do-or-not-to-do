const baseURL = "http://127.0.0.1:4001"

export const getHelper = async (endpoint) => {
  const res = await fetch(`${baseURL}${endpoint}`)
  const data = await res.json()
  return data
}

export const postHelper = async (endpoint, collectionJson) => {
  const res = await fetch(`${baseURL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(collectionJson)
  })
  const data = await res.json()
  return data
}

export const deleteHelper = async (endpoint, id) => {
  const res = await fetch(`${baseURL}${endpoint}${id}`, {
    method: "DELETE"
  })
  const data = await res.json()
  return data
}

export const putHelper = async (endpoint, collectionJson) => {
  const res = await fetch(`${baseURL}${endpoint}${collectionJson.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(collectionJson)
  })
  const data = await res.json() //return updated item
  return data
}
