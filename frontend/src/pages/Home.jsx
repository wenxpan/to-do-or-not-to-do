import React, { useContext } from "react"
import moment from "moment"
import TaskContext from "../contexts/TaskContext"
import TaskLine from "../components/TaskLine"

const Home = () => {
  const { tasks } = useContext(TaskContext)
  if (tasks.length) {
    const currentDate = moment().format("dddd, MMMM Do")

    function getDailyTaskId() {
      const storedDate = localStorage.getItem("Date")
      const storedTaskId = localStorage.getItem("TaskId")

      const expired = storedDate !== currentDate
      const taskInData = tasks.find((t) => t._id == storedTaskId)

      if (expired || !taskInData) {
        // if no task or date expired, set new task and return new id
        localStorage.setItem("Date", currentDate)
        const randomTask = tasks[Math.floor(Math.random() * tasks.length)]
        localStorage.setItem("TaskId", randomTask._id)
      }

      return storedTaskId
    }

    const dailyTask = tasks.find((t) => t._id === getDailyTaskId())
    console.log(dailyTask)

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
      </>
    )
  }
}

export default Home
