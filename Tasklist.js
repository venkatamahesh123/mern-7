import React, { useEffect, useState, useCallback } from "react";
import { fetchTasks, fetchTasksByStatus, updateTask } from "../services/api";
import "./TaskList.css";
constTaskList = ({ statusFilter }) => {
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [editingTask, setEditingTask] = useState(null); // State for editing task
// Function to load tasks based on the status filter
constloadTasks = useCallback(async () => {
try {
setLoading(true);
setError(null);
lettasksData;
if (statusFilter === "All") {
tasksData = await fetchTasks();
} else {
tasksData = await fetchTasksByStatus(statusFilter);
}
setTasks(tasksData);
} catch (error) {
console.error("Error fetching tasks:", error);
setError("Failed to fetch tasks. Please try again later.");
} finally {
setLoading(false);
}
}, [statusFilter]);
// Fetch tasks when the component mounts or when the status filter changes
useEffect(() => {
loadTasks();
}, [loadTasks]);
// Handle editing a task
consthandleEdit = (task) => {
setEditingTask(task);
};
// Handle updating a task
consthandleUpdate = async (e) => {
e.preventDefault();
try {
// Determine the new status based on the percentage value
letnewStatus = "Pending";
if (editingTask.percentage> 0 &&editingTask.percentage< 100) {
newStatus = "InProgress";
} else if (editingTask.percentage === 100) {
newStatus = "Completed";
}
// Update the task with the new status
constupdatedTask = await updateTask(editingTask._id, {
title: editingTask.title,
percentage: editingTask.percentage,
status: newStatus, // Include the new status
});
// Update the task list with the updated task
setTasks((prevTasks) =>
prevTasks.map((task) =>
task._id === updatedTask._id ? updatedTask : task
)
);
setEditingTask(null); // Exit editing mode
} catch (error) {
console.error("Error updating task:", error);
}
};
// Render loading state
if (loading) {
return <p>Loading tasks...</p>;
}
// Render error state
if (error) {
return <p style={{ color: "red" }}>{error}</p>;
}
// Render task list
return (
<div className="task-list">
<h2>Task List</h2>
{tasks.length === 0 ? (
<p>No tasks available</p>
) : (
<div className="task-cards">
{tasks.map((task) => (
<div className="task-card" key={task._id}>
{editingTask&&editingTask._id === task._id ? (
<form onSubmit={handleUpdate}>
<input
type="text"
value={editingTask.title}
onChange={(e) =>
setEditingTask({ ...editingTask, title: e.target.value })
}
required
/>
<input
type="number"
value={editingTask.percentage}
onChange={(e) =>
setEditingTask({
...editingTask,
percentage: Number(e.target.value),
})
}
min="0"
max="100"
required
/>
<button type="submit">Save</button>
</form>
) : (
<>
<h3>{task.title}</h3>
<div className="progress-bar">
<div
className="progress"
style={{ width: `${task.percentage}%` }}
>
{task.percentage}%
</div>
</div>
<button onClick={() =>handleEdit(task)}>Edit</button>
</>
)}
</div>
))}
</div>
)}
</div>
);
};
export default TaskList;