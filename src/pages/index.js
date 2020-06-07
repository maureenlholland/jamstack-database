import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './index.module.css';
import Todo from './components/todo';

export default () => {
    const [status, setStatus] = useState('loading');
    const [todos, setTodos] = useState(null);

    // this hook will trigger every time status changes
    useEffect(() => {
        let cancelled = false;
        if (status !== 'loading') { return; }

        console.log('using effect')

        axios('/api/get-all-todos')
            .then(result => {
                if (cancelled === true) { return; }

                if (result.status !== 200) {
                    console.error('Error');
                    console.error(result);
                    return;
                }

                setTodos(result.data.todos);
                setStatus('loaded');
            });

        return () => { cancelled = true; }
    }, [status]);
    return (
        <main>
            <h1 className={styles.heading}>Todos</h1>
            {todos ? (
                <ul className={styles.todo}>
                    {todos.map(todo => (
                        <li key={todo.id} className={styles.todo}>
                            <Todo key={`todo-${todo.id}`} todo={todo} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.loading}>Loading todos</p>
            )}
        </main>
    );
}