import React from "react";
import "./TaskStatusFilter.css";
constTaskStatusFilter = ({ onStatusChange }) => {
consthandleChange = (event) => {
if (onStatusChange) {
onStatusChange(event.target.value); // Call the function passed as a prop
}
};
return (
<div className="task-status-filter">
<label htmlFor="status">Filter by Status</label>
<select id="status" onChange={handleChange}>
<option value="All">All</option>
<option value="Pending">Pending</option>
<option value="InProgress">In Progress</option>
<option value="Completed">Completed</option>
</select>
</div>
);
};
export default TaskStatusFilter;