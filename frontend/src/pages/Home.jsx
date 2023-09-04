import React, { useContext, useEffect, useState } from "react"
import moment from "moment"
import TaskContext from "../contexts/TaskContext"
import TaskLine from "../components/TaskLine"
import ProgressLine from "../components/ProgressLine"

const Home = () => {
  const { tasks } = useContext(TaskContext)
  const [dailyTask, setDailyTask] = useState()

  const currentDate = moment().format("dddd, MMMM Do")

  const storedTaskId = localStorage.getItem("TaskId")
  const taskInData = tasks && tasks.find((t) => t._id == storedTaskId)

  useEffect(() => {
    const storedDate = localStorage.getItem("Date")
    const expired = storedDate !== currentDate

    if (expired || !taskInData) {
      // if no task, or date expired, set new task and return new id
      localStorage.setItem("Date", currentDate)
      setRandomTask()
    }
    setDailyTask(taskInData)
  }, [currentDate, taskInData])

  function setRandomTask() {
    if (tasks && tasks.length > 0) {
      const randomTask = tasks[Math.floor(Math.random() * tasks.length)]
      localStorage.setItem("TaskId", randomTask._id)
      setDailyTask(randomTask)
    }
  }

  if (!dailyTask) {
    return null
  }

  return (
    <>
      <h1>To do or not to do</h1>
      <aside>{currentDate}</aside>
      <p>Today's task:</p>
      <TaskLine task={dailyTask} />
      {dailyTask.doReason && (
        <>
          <p>Do this today to achieve the following:</p>
          <p>{dailyTask.doReason}</p>
        </>
      )}
      <p>Notes: </p>
      <p>{dailyTask.additionalInfo}</p>
      <button onClick={setRandomTask}>Shuffle</button>
    </>
  )
}

export default Home
