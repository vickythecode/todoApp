import React, { useState, useEffect } from 'react';
import './App.css';


const App = () => {
    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/tasks') // Correct the port here
            .then(res => res.json())
            .then(data => setTasks(data))
            .catch(err => console.error('Error fetching tasks:', err));
    }, []);

    const addTask = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/api/tasks', { // Correct the port here
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, description }),
        })
            .then(res => res.json())
            .then(newTask => {
                setTasks([...tasks, newTask]);
                setName('');
                setDescription('');
            })
            .catch(err => console.error('Error adding task:', err));
    };

    const deleteTask = (id) => {
        fetch(`http://localhost:5000/api/tasks/${id}`, { method: 'DELETE' }) // Correct the port here
            .then(() => setTasks(tasks.filter(task => task._id !== id)))
            .catch(err => console.error('Error deleting task:', err));
    };

    const toggleCompletion = (id) => {
        fetch(`http://localhost:5000/api/tasks/${id}`, { method: 'PATCH' }) // Correct the port here
            .then(res => res.json())
            .then(updatedTask => {
                setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
            })
            .catch(err => console.error('Error updating task:', err));
    };

    return (
        <div className="App">
            <h1>To-Do List</h1>
            <form onSubmit={addTask}>
                <input
                    type="text"
                    placeholder="Task Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Add Task</button>
            </form>
            <ul>
    {tasks.map(task => (
        <li key={task._id}>
            <span className={task.completed ? 'completed' : ''}>
                {task.name}: {task.description}
            </span>
            <button onClick={() => toggleCompletion(task._id)}>
                {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
        </li>
    ))}
</ul>
        </div>
    );
};

export default App;
