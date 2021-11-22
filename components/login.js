import React, { useContext, useState } from 'react';
import Button from './button';

import { authenticate } from '../lib/auth';

import styles from '../styles/login.module.css';
import authContext from '../contexts/token';

const Login = ({ loginMethod }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className={styles.container}>
            <div className={styles.login}>
                <input placeholder="Username" id="username" value={username} onChange={e => setUsername(e.target.value)} className={styles.field} type="text" />
                <input placeholder="Password" id="password" value={password} onChange={e => setPassword(e.target.value)} className={styles.field} type="password" />
                <Button severity='normal' text='Login' onClick={() => loginMethod(username, password)} />
            </div>
        </div>
    );
}

export default Login;