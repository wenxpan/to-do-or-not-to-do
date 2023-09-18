// base URL for all api requests
const baseURL = "http://127.0.0.1:4001"

// perform a fetch request with headers and error handling
async function fetchWithHeaders(endpoint, options = {}) {
  const res = await fetch(`${baseURL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  })

  // check for failed request
  if (!res.ok) {
    const message = await res.text()
    throw new Error(
      `Request failed, status: ${res.status}, message: ${message}`
    )
  }

  // for DELETE request, only res will be returned
  if (options?.method === "DELETE") {
    return res
  }

  // for other requests, return parsed data
  return await res.json()
}

// helper function to perform GET request
export const apiGet = async (endpoint) => {
  try {
    return await fetchWithHeaders(endpoint, {})
  } catch (e) {
    console.error(`GET ${endpoint} failed: ${e.message}`)
    throw e
  }
}

// helper function to perform POST request
export const apiPost = async (endpoint, body) => {
  try {
    return await fetchWithHeaders(endpoint, {
      method: "POST",
      body: JSON.stringify(body)
    })
  } catch (e) {
    console.error(`POST ${endpoint} failed: ${e.message}`)
    throw e
  }
}

// helper function to perform DELETE request
export const apiDelete = async (endpoint) => {
  try {
    return await fetchWithHeaders(endpoint, { method: "DELETE" })
  } catch (e) {
    console.error(`DELETE ${endpoint} failed: ${e.message}`)
    throw e
  }
}

// helper function to perform PUT request
export const apiPut = async (endpoint, body) => {
  try {
    return await fetchWithHeaders(endpoint, {
      method: "PUT",
      body: JSON.stringify(body)
    })
  } catch (e) {
    console.error(`PUT ${endpoint} failed: ${e.message}`)
    throw e
  }
}

// const baseURL = "http://127.0.0.1:4001"

// export const getHelper = async (endpoint) => {
//   const res = await fetch(`${baseURL}${endpoint}`, { credentials: "include" })
//   const data = await res.json()
//   return data
// }

// export const postHelper = async (endpoint, body) => {
//   const res = await fetch(`${baseURL}${endpoint}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//     credentials: "include"
//   })
//   const data = await res.json()
//   return data
// }

// export const deleteHelper = async (endpoint) => {
//   const res = await fetch(`${baseURL}${endpoint}`, {
//     method: "DELETE",
//     credentials: "include"
//   })
//   // const data = await res.json()
//   return res
// }

// export const putHelper = async (endpoint, body) => {
//   const res = await fetch(`${baseURL}${endpoint}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//     credentials: "include"
//   })
//   const data = await res.json() //return updated item
//   return data
// }
