import { useEffect, useReducer, useState } from "react"
import { Routes, Route } from "react-router-dom"
import "../css/App.css"
import taskReducer from "../reducers/taskReducer"
import Tasks from "../pages/Tasks"
import TaskContext from "../contexts/TaskContext.js"
import { getTasks } from "../services/tasksService"

function App() {
  const [tasks, tasksDispatch] = useReducer(taskReducer, [])

  useEffect(() => {
    getTasks().then((tasks) => tasksDispatch({ type: "set_tasks", tasks }))
  }, [])

  return (
    <>
      <TaskContext.Provider value={{ tasks, tasksDispatch }}>
        <h1>To do or not to do</h1>
        <Routes>
          <Route path="/" />
          <Route path="/tasks" element={<Tasks />}>
            <Route path="new" />
            <Route path=":id" />
          </Route>
          <Route path="archive" />
        </Routes>
      </TaskContext.Provider>
    </>
  )
}

// const [newTask, setNewTask] = useState({ title: "" })

// const testContent = (
//   <>
//     <input
//       value={newTask.title}
//       onChange={(e) =>
//         setNewTask((prev) => ({ ...prev, title: e.target.value }))
//       }
//       placeholder="add task"
//     ></input>
//     <button onClick={() => handleAddTask(newTask)}>Add task</button>
//     <h2>All tasks:</h2>
//     {tasks.map((t) => (
//       <div key={t._id}>
//         <p>{t.title}</p>
//         <p>Completed: {t.isCompleted ? "Yes" : "No"}</p>
//         <p>Archived: {t.isArchived ? "Yes" : "No"}</p>
//         <button>edit</button>
//         <button onClick={() => handleDeleteTask(t)}>delete</button>
//         <button onClick={() => handleCompleteTask(t)}>toggle complete</button>
//         <button onClick={() => handleArchiveTask(t)}>toggle archive</button>
//       </div>
//     ))}
//   </>
// )

const initialTasks = [
  {
    _id: "64d478e3c02f6864ab76281d",
    title: "Finish reading Phoenix Project",
    dateAdded: "2023-08-08T00:00:00.000Z",
    isCompleted: false,
    isArchived: false,
    delayReason: "I'm reading other books right now, don't have time for this",
    doReason: "I can learn more about project management",
    additionalInfo: "Link to book: amazon.com/phoenix-project",
    tags: ["book", "pd", "web-dev"],
    progress: [
      {
        date: "2023-08-08T00:00:00.000Z",
        description: "Read first few pages",
        _id: "64d478e3c02f6864ab76281e"
      },
      {
        date: "2023-08-09T00:00:00.000Z",
        description: "Read a few more pages",
        _id: "64d478e3c02f6864ab76281f"
      }
    ],
    __v: 0
  },
  {
    _id: "64d478e3c02f6864ab762820",
    title: "Start reading Dune",
    dateAdded: "2023-08-08T00:00:00.000Z",
    isCompleted: false,
    isArchived: false,
    delayReason: "I'm busy with work and family commitments",
    doReason: "I've heard great things about the book",
    additionalInfo: "Link to book: amazon.com/dune",
    tags: ["book", "scifi", "fiction"],
    progress: [],
    __v: 0
  },
  {
    _id: "64d478e3c02f6864ab762821",
    title: "Complete JavaScript Course",
    dateAdded: "2023-08-01T00:00:00.000Z",
    isCompleted: false,
    isArchived: false,
    delayReason: "I've been focusing on other programming languages",
    doReason: "Improving my web development skills",
    additionalInfo: "Course platform: udemy.com/js-course",
    tags: ["course", "programming", "web-dev"],
    progress: [
      {
        date: "2023-08-01T00:00:00.000Z",
        description: "Completed the basic modules",
        _id: "64d478e3c02f6864ab762822"
      },
      {
        date: "2023-08-09T00:00:00.000Z",
        description: "Started working on advanced topics",
        _id: "64d478e3c02f6864ab762823"
      }
    ],
    __v: 0
  },
  {
    _id: "64d478e3c02f6864ab762824",
    title: "Learn French",
    dateAdded: "2023-07-15T00:00:00.000Z",
    isCompleted: true,
    isArchived: false,
    delayReason: "Was initially busy with work projects",
    doReason: "To enhance my language skills and explore French culture",
    additionalInfo: "Language learning app: duolingo.com/french",
    tags: ["language", "learning", "culture"],
    progress: [
      {
        date: "2023-07-15T00:00:00.000Z",
        description: "Completed beginner's lessons",
        _id: "64d478e3c02f6864ab762825"
      },
      {
        date: "2023-07-30T00:00:00.000Z",
        description: "Practiced conversations and vocabulary",
        _id: "64d478e3c02f6864ab762826"
      },
      {
        date: "2023-08-10T00:00:00.000Z",
        description: "Finished intermediate level",
        _id: "64d478e3c02f6864ab762827"
      }
    ],
    __v: 0
  },
  {
    _id: "64d478e3c02f6864ab762828",
    title: "Old Blog Cleanup",
    dateAdded: "2023-06-20T00:00:00.000Z",
    isCompleted: false,
    isArchived: true,
    delayReason: "Focused on current projects and priorities",
    doReason: "To maintain a clean online presence and remove outdated content",
    additionalInfo: "Link to blog: example.com/my-blog",
    tags: ["blog", "content", "online-presence"],
    progress: [
      {
        date: "2023-06-20T00:00:00.000Z",
        description: "Reviewed and archived irrelevant posts",
        _id: "64d478e3c02f6864ab762829"
      },
      {
        date: "2023-07-05T00:00:00.000Z",
        description: "Updated formatting and images of popular posts",
        _id: "64d478e3c02f6864ab76282a"
      }
    ],
    __v: 0
  }
]

export default App
