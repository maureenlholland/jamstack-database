import React, { useState } from 'react';
import axios from 'axios';
import styles from './form.module.css';

const Form = ({ reload }) => {
    const [text, setText] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        if (!text) {
            return;
        }

        await axios.post('/api/create-todo', { text });

        setText('');
        reload();
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <label className={styles.label}>
                Add a todo
                <input
                    className={styles.input}
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
            </label>
            <button className={styles.button}>Save todo</button>
        </form>
    );
}

export default Form;