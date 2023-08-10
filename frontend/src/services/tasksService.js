import { deleteHelper, getHelper, postHelper, putHelper } from "./apiHelper.js"

export const getTasks = async () => {
  return await getHelper("/tasks/")
}

export const postTask = async (task) => {
  return await postHelper("/tasks/", task)
}

export const deleteTask = async (id) => {
  return await deleteHelper("/tasks/", id)
}

export const putTask = async (task) => {
  return await putHelper("/tasks/", task)
}
