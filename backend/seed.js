import { UserModel, TaskModel, dbClose } from "./db.js"
import bcrypt from "bcryptjs"

const salt = await bcrypt.genSalt(10)

const users = [
  {
    username: "Demo",
    password: await bcrypt.hash("Demouser", salt),
    email: "demo@gmail.com",
    isAdmin: false
  },
  {
    username: "John",
    password: await bcrypt.hash("testing", salt),
    email: "john@gmail.com",
    isAdmin: false
  },
  {
    username: "Admin",
    password: await bcrypt.hash("testing", salt),
    email: "admin@gmail.com",
    isAdmin: true
  }
]

await UserModel.deleteMany()
console.log("deleted users")
const insertedUsers = await UserModel.insertMany(users)
console.log("inserted users")

const tasks = [
  {
    title: "Finish reading Phoenix Project",
    dateAdded: "2023-08-08",
    isCompleted: false,
    isArchived: false,
    delayReason: "I'm reading other books right now, don't have time for this",
    doReason: "I can learn more about project management",
    additionalInfo: "Link to book: amazon.com/phoenix-project",
    tags: ["book", "pd", "web-dev"],
    progress: [
      {
        date: "2023-08-08",
        description: "Read first few pages"
      },
      {
        date: "2023-08-09",
        description: "Read a few more pages"
      }
    ],
    user: insertedUsers[0]
  },
  {
    title: "Start reading Dune",
    dateAdded: "2023-08-08",
    isCompleted: false,
    isArchived: false,
    delayReason: "I'm busy with work and family commitments",
    doReason: "I've heard great things about the book",
    additionalInfo: "Link to book: amazon.com/dune",
    tags: ["book", "scifi", "fiction"],
    progress: [],
    user: insertedUsers[0]
  },
  {
    title: "Complete JavaScript Course",
    dateAdded: "2023-08-01",
    isCompleted: false,
    isArchived: false,
    delayReason: "I've been focusing on other programming languages",
    doReason: "Improving my web development skills",
    additionalInfo: "Course platform: udemy.com/js-course",
    tags: ["course", "programming", "web-dev"],
    progress: [
      {
        date: "2023-08-01",
        description: "Completed the basic modules"
      },
      {
        date: "2023-08-09",
        description: "Started working on advanced topics"
      }
    ],
    user: insertedUsers[0]
  },
  {
    title: "Learn French",
    dateAdded: "2023-07-15",
    isCompleted: true,
    isArchived: false,
    delayReason: "Was initially busy with work projects",
    doReason: "To enhance my language skills and explore French culture",
    additionalInfo: "Language learning app: duolingo.com/french",
    tags: ["language", "learning", "culture"],
    progress: [
      {
        date: "2023-07-15",
        description: "Completed beginner's lessons"
      },
      {
        date: "2023-07-30",
        description: "Practiced conversations and vocabulary"
      },
      {
        date: "2023-08-10",
        description: "Finished intermediate level"
      }
    ],
    user: insertedUsers[0]
  },
  {
    title: "Old Blog Cleanup",
    dateAdded: "2023-06-20",
    isCompleted: false,
    isArchived: true,
    delayReason: "Focused on current projects and priorities",
    doReason: "To maintain a clean online presence and remove outdated content",
    additionalInfo: "Link to blog: example.com/my-blog",
    tags: ["blog", "content", "online-presence"],
    progress: [
      {
        date: "2023-06-20",
        description: "Reviewed and archived irrelevant posts"
      },
      {
        date: "2023-07-05",
        description: "Updated formatting and images of popular posts"
      }
    ],
    user: insertedUsers[0]
  }
]

await TaskModel.deleteMany()
console.log("deleted tasks")
await TaskModel.insertMany(tasks)
console.log("inserted tasks")

await dbClose()
