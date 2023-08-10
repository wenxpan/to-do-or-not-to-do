import { deleteHelper, getHelper, postHelper, putHelper } from "./apiHelper.js"

export const getTasks = async () => {
  return await getHelper("/tasks/")
}

export const createTask = async (taskJson) => {
  return await postHelper("/tasks/", taskJson)
}

export const deleteTask = async (id) => {
  return await deleteHelper("/tasks/", id)
}

export const updateTask = async (taskJson) => {
  return await putHelper("/tasks/", taskJson)
}
