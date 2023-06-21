const express = require("express")
const router = express.Router()
const {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  deleteCompleted,
} = require("../controllers/todoController")

router.get("/", getTodos)

//router.get("/", (req, res) => {
//res.status(200).json({ message: "Get goals" }); // to cos pozwala nam dodac ? goala
//});

router.post("/new", addTodo)

//router.post("/", (req, res) => {
//res.status(200).json({ message: "Set goal" }); // to cos pozwala nam tworzyc goal
//});

router.put("/:id", updateTodo)

//router.put("/:id", (req, res) => {
//res.status(200).json({ message: `Update goal ${req.params.id}` }); // to cos pozwala nam zrobic update goala
//});
router.delete("/deleteCompleted", deleteCompleted)

router.delete("/:id", deleteTodo)

//router.delete("/:id", (req, res) => {
//res.status(200).json({ message: `Delete goal ${req.params.id}` }); // a to pozwala nam usunąć jakiegoś goala
//});

module.exports = router
