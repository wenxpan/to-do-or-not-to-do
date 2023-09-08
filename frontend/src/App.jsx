import { useEffect, useReducer, useState } from "react"
import { Routes, Route, useParams } from "react-router-dom"
import "./App.css"
import taskReducer from "./reducers/taskReducer"
import AllTasks from "./pages/AllTasks"
import ShowTask from "./pages/ShowTask"
import TaskContext from "./contexts/TaskContext.js"
import { getTasks } from "./services/tasksService"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Archive from "./pages/Archive"
import NewTask from "./pages/NewTask"
import Login from "./pages/Login"
import { getHelper } from "./services/apiHelper"
import UserContext from "./contexts/UserContext"
import Signup from "./pages/Signup"
import Landing from "./pages/Landing"
import LoggedInRoute from "./pages/LoggedInRoute"
import IntroRoute from "./pages/IntroRoute"

function App() {
  const [tasks, tasksDispatch] = useReducer(taskReducer, [])

  const [user, setUser] = useState()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getHelper("/check-auth")
        if (data.success) {
          setUser({ ...data.user, isLoggedIn: true })
        } else {
          setUser({ isLoggedIn: false })
        }
        setLoaded(true)
      } catch (e) {
        console.error(e)
      }
    }
    checkAuth()
  }, [])

  useEffect(() => {
    const loadData = async () => {
      if (loaded && user.isLoggedIn) {
        const returnedTasks = await getTasks(user._id)
        tasksDispatch({ type: "set_tasks", tasks: returnedTasks })
      }
    }
    loadData()
  }, [user])

  function ShowTaskWrapper() {
    const { id } = useParams()
    return <ShowTask task={tasks.find((t) => t._id === id)} />
  }

  return (
    <>
      <UserContext.Provider value={{ user, setUser, loaded }}>
        <TaskContext.Provider value={{ tasks, tasksDispatch }}>
          <Navbar />
          <Routes>
            <Route path="" element={<IntroRoute />}>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
            <Route path="" element={<LoggedInRoute />}>
              <Route path="/account" element={<Home />} />
              <Route path="/tasks">
                <Route index element={<AllTasks />} />
                <Route path="new" element={<NewTask />} />
                <Route path=":id" element={<ShowTaskWrapper />} />
              </Route>
            </Route>
            <Route path="archive" element={<Archive />} />
          </Routes>
        </TaskContext.Provider>
      </UserContext.Provider>
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
