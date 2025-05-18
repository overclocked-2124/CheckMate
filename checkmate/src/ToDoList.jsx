import React, { useState } from 'react';
import './ToDoList.css'; // Make sure to create this CSS file

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() === "") {
            return;
        }
        setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
        setNewTask("");
    }

    function deleteTask(taskIdToDelete) {
        setTasks(tasks.filter(task => task.id !== taskIdToDelete));
    }

    function toggleComplete(taskIdToToggle) {
        setTasks(
            tasks.map(task =>
                task.id === taskIdToToggle ? { ...task, completed: !task.completed } : task
            )
        );
    }

    return (
        <div className="todo-app-container">
            <div className="todo-wrapper">
                <header className="todo-header">
                    <h1 className="todo-title">CheckMate</h1>
                    <p className="todo-subtitle">Your Simple To-Do List</p>
                </header>

                <div className="todo-input-group">
                    <input
                        type="text"
                        value={newTask}
                        onChange={handleInputChange}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                addTask();
                            }
                        }}
                        placeholder="Add a new task..."
                        className="todo-input"
                    />
                    <button
                        onClick={addTask}
                        className="todo-add-button"
                    >
                        Add
                    </button>
                </div>

                {tasks.length === 0 ? (
                    <p className="todo-empty-message">No tasks yet! Add one above.</p>
                ) : (
                    <ul className="todo-list">
                        {tasks.map(task => (
                            <li
                                key={task.id}
                                className={`todo-item ${task.completed ? 'todo-item--completed' : ''}`}
                            >
                                <div className="todo-item-content">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleComplete(task.id)}
                                        className="todo-checkbox"
                                    />
                                    <span className={`todo-text ${task.completed ? 'todo-text--completed' : ''}`}>
                                        {task.text}
                                    </span>
                                </div>
                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className="todo-delete-button"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <footer className="todo-footer">
                <p>CheckMate © {new Date().getFullYear()} - A Simple React To-Do App</p>
            </footer>
        </div>
    );
}

export default ToDoList;