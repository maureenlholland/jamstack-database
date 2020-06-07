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
        </>
    );
}

export default Todo;
