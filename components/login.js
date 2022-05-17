import React, { useContext, useState } from 'react';

import { authenticate } from '../lib/auth';

import styles from '../styles/login.module.css';
import Context from './context';
import { Button } from 'geekson-ui';

const Login = () => {
    const usernameInput = React.useRef();
    const passwordInput = React.useRef();
    const { tokenCtx } = React.useContext(Context);
    const { setToken } = tokenCtx;

    const auth = async () => {
        console.log('auth triggered !');
        const authInfo = {
            username: usernameInput.current.value,
            password: passwordInput.current.value
        };
        
        const newToken = await authenticate(authInfo);
        setToken(newToken);
    }

    return (
        <div className={styles.container}>
            <div className={styles.login}>
                <input ref={usernameInput} placeholder="Username" id="username" className={styles.field} type="text" />
                <input ref={passwordInput} placeholder="Password" id="password" className={styles.field} type="password" />
                <button severity='normal' onClick={() => auth()}>Login</button>
            </div>
        </div>
    );
}

export default Login;