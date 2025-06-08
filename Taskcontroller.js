const Task = require("../models/taskModel");
// Get all tasks
constgetTasks = async (req, res) => {
try {
const tasks = await Task.find();
res.status(200).json(tasks);
} catch (error) {
res.status(500).json({ message: "Server Error" });
}
};
// Get a single task by ID
constgetTaskById = async (req, res) => {
try {
const{ id } = req.params;
const task = await Task.findById(id);
if (!task) {
return res.status(404).json({ message: "Task not found" });
}
res.status(200).json(task);
} catch (error) {
res.status(500).json({ message: "Server Error" });
}
};
// Get tasks by status
constgetTasksByStatus = async (req, res) => {
try {
const{ status } = req.params;
const tasks = await Task.find({ status });
res.status(200).json(tasks);
} catch (error) {
res.status(500).json({ message: "Server Error" });
}
};
// Create a new task
constcreateTask = async (req, res) => {
try {
const{ title, percentage } = req.body;
if (!title) {
return res.status(400).json({ message: "Task title is required" });
}
const task = await Task.create({
title,
percentage: percentage || 0, // Default to 0 if not provided
});
res.status(201).json(task);
} catch (error) {
console.error("Error creating task:", error);
res.status(500).json({ message: "Server Error" });
}
};
constupdateTask = async (req, res) => {
try {
const{ id } = req.params;
const{ title, percentage, status } = req.body;
const task = await Task.findById(id);
if (!task) {
return res.status(404).json({ message: "Task not found" });
}
if (title) task.title = title;
if (percentage !== undefined) task.percentage = percentage;
if (status) task.status = status;
await task.save();
res.status(200).json(task);
} catch (error) {
console.error("Error updating task:", error);
res.status(500).json({ message: "Server Error" });
}
};
constdeleteTask = async (req, res) => {
try {
const{ id } = req.params;
constdeletedTask = await Task.findByIdAndDelete(id);
if (!deletedTask) {
return res.status(404).json({ message: "Task not found" });
}
res.status(200).json({ message: "Task deleted successfully" });
} catch (error) {
res.status(500).json({ message: "Server Error" });
}
};
module.exports = {
getTasks,
getTaskById,
getTasksByStatus,
createTask,
updateTask,
deleteTask,
};
