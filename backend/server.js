const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config(); // dodane eby miec " enviroment virables"
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 7777; // "process.env.PORT" pozwala na rozkazanie aby zawsze komp probowala dzialac na porcie ktory jest w pliku .env "lub" => || na porcie 7777

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/todos", require("./routes/todoRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server is runing on port ${port}`));

//   const cors = require("cors");
//   const todos = [
//     {
//       id: 123,
//       title: "Buy milk",
//       completed: false,
//     },
//     {
//       id: 2321,
//       title: "Buy bread",
//       completed: false,
//     },
//     {
//       id: 32323,
//       title: "Buy apple",
//       completed: false,
//     },
//   ];

//   app.use(cors());
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: false }));

//   app.get("/", (req, res) => {
//     res.send(todos);
//   });

//   app.post("/new", (req, res) => {
//     const { title } = req.body;
//     const newTodo = {
//       id: Math.floor(Math.random() * 100),
//       title,
//       completed: false,
//     };
//     todos.push(newTodo);
//     res.send(newTodo);
//   });
// });
