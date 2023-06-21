const asyncHandler = require("express-async-handler")

const Todo = require("../models/todoModel")
// @desc    Get goals
// @route   GET api/goals
// @access  Private

const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find()

  res.status(200).json(todos)
})

// @desc    Set goals
// @route   POST api/goals
// @access  Private

const addTodo = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error("Please add a text field")
  }

  console.log(req.body)

  const todo = await Todo.create({
    text: req.body.text,
  })

  res.status(200).json(todo)
})

// @desc    Update goals
// @route   PUT api/goals/:id
// @access  Private

const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id)

  if (!todo) {
    res.status(400)
    throw new Error("Goals not found")
  }

  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    req.body.todo,
    {
      new: true,
    }
  )
  res.status(200).json(updatedTodo)
})

// @desc    Delete goals
// @route   DELETE api/goals/:ip
// @access  Private

const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id)

  if (!todo) {
    res.status(400)
    throw new Error("Todo not found")
  }

  await todo.remove()

  res.status(200).json({ id: req.params.id })
})

const deleteCompleted = asyncHandler(async (req, res) => {
  const todos = await Todo.deleteMany({ completed: true })

  res.status(200).json(todos)
})

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  deleteCompleted,
}
