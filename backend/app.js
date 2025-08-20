const dotEnv = require("dotenv");
dotEnv.config({ override: true });
const express = require("express");
const cors = require("cors");
const db = require("./init/db");
const Todo = require("./model/Todo.model");

const app = express();

// Helper to wrap async routes
function wrapAsync(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Add a new todo
app.post("/add", wrapAsync(async (req, res) => {
  const { user, date, data } = req.body;

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid user",
    });
  }

  if (!data) {
    return res.status(400).json({
      success: false,
      message: "Invalid data",
    });
  }

  const newTodo = await Todo.create({ user, date, data });

  res.status(201).json({
    success: true,
    message: "Todo added successfully",
    todo: newTodo
  });
}));

// Get todos for a user (use query params)
app.post("/todo", wrapAsync(async (req, res) => {
  const { user, date } = req.body;

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid user",
    });
  }
  if (!date) {
    return res.status(400).json({
      success: false,
      message: "Invalid date",
    });
  }


  const todos = await Todo.find({ user: user, date: date });

  res.status(200).json({
    success: true,
    todos
  });
}));
// Mark a todo as done
app.post("/done", wrapAsync(async (req, res) => {
  const { todoId } = req.body;

  if (!todoId) {
    return res.status(400).json({
      success: false,
      message: "Missing todoId",
    });
  }

  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: todoId },      // Match by _id
    { completed: true },  // Set completed to true
    { new: true }         // Return the updated document
  );

  if (!updatedTodo) {
    return res.status(404).json({
      success: false,
      message: "Todo not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Todo marked as completed",
    todo: updatedTodo,
  });
}));

// Universal Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
  });
});

module.exports = app;
