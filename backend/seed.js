import { itemModel, dbClose } from "./db.js"

const items = [
  {
    title: "Finish reading Phoenix Project",
    dateAdded: "2023-08-08",
    status: "added",
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
    ]
  },
  {
    title: "Start reading Dune",
    dateAdded: "2023-08-08",
    status: "added",
    delayReason: "I'm busy with work and family commitments",
    doReason: "I've heard great things about the book",
    additionalInfo: "Link to book: amazon.com/dune",
    tags: ["book", "scifi", "fiction"],
    progress: [
      {
        date: "2023-08-08",
        description: "Read the first chapter"
      }
    ]
  },
  {
    title: "Complete JavaScript Course",
    dateAdded: "2023-08-01",
    status: "in-progress",
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
    ]
  }
]

await itemModel.deleteMany()
console.log("deleted items")
await itemModel.insertMany(items)
console.log("inserted categories")

await dbClose()
