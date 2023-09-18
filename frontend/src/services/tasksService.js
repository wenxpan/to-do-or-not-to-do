import { apiDelete, apiGet, apiPost, apiPut } from "./apiHelper.js"

export const getTasks = async (id) => {
  return await apiGet(`/users/${id}/tasks`)
}

export const postTask = async (task) => {
  return await apiPost("/tasks/", task)
}

export const deleteTask = async (id) => {
  return await apiDelete(`/tasks/${id}`)
}

export const putTask = async (task) => {
  return await apiPut(`/tasks/${task._id}`, task)
}
