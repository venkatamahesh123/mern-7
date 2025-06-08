import React, { useState } from "react";
import axios from "axios";
import "./TaskForms.css";
constTaskForm = () => {
const [title, setTitle] = useState(""); // State for task title
const [completionPercentage, setCompletionPercentage] = useState(0); // State for completion
percentage
const [error, setError] = useState(null); // State for error handling
const [success, setSuccess] = useState(false); // State for success message
consthandleSubmit = async (e) => {
e.preventDefault();
setError(null); // Reset error state
setSuccess(false); // Reset success state
try {
const response = await axios.post("http://localhost:5000/api/tasks", {
title,
percentage: completionPercentage,
});
console.log("Task Added:", response.data);
setTitle(""); // Clear the input field
setCompletionPercentage(0); // Reset completion percentage
setSuccess(true); // Set success state
} catch (error) {
console.error("Error adding task:", error);
setError("Failed to add task. Please try again.");
}
};
return (
<form onSubmit={handleSubmit}>
<h2>Add New Task</h2>
<input
type="text"
value={title}
onChange={(e) =>setTitle(e.target.value)}
placeholder="Enter task title"
required
/>
<input
type="number"
value={completionPercentage}
onChange={(e) =>setCompletionPercentage(Number(e.target.value))}
placeholder="Completion Percentage"
min="0"
max="100"
required
/>
<button type="submit">Add Task</button>
{success &&<p className="success">Task added successfully!</p>}
{error &&<p className="error">{error}</p>}
</form>
);
};
export default TaskForm;
