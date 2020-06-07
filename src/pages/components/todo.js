import React from 'react';
import axios from 'axios';
import styles from './todo.module.css';

const Todo = ({ todo, reload }) => {
    const toggleCompleted = async () => {
        const { _id, text, completed } = todo;
        await axios.post('/api/toggle-completed', { id: _id, text, completed: !completed }).then(() => {
            reload();
        });
    }
    const deleteTodo = async () => {
        await axios.post('/api/delete-todo', { id: todo._id }).then(() => reload());
    };
    return (
        <>
        <label>
            {todo.text}
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
        </label>
        <button onClick={deleteTodo}>Delete</button>
        </>
    );
}

export default Todo;
