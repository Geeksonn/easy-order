import React from 'react';

import { authenticateUser } from '@lib/realmClient';
import StateContext from '@context/stateContext';

import css from '@styles/login.module.css';
import { Button, Spinner } from 'geekson-ui';

const Login = () => {
    const [showSpinner, setShowSpinner] = React.useState(false);
    const { stateCtx } = React.useContext(StateContext);

    const auth = async () => {
        setShowSpinner(true);

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const user = await authenticateUser(email, password);
        stateCtx.setState({ ...stateCtx.state, user: user });
    };

    return (
        <div className={css.container}>
            <div className={css.login}>
                <input placeholder='E-mail' id='email' type='text' />
                <input placeholder='Password' id='password' type='password' className='mt-4' />

                {!showSpinner && (
                    <Button id='loginBtn' label='Login' accent='blue' clickHandler={auth} className='mt-6' />
                )}
                {showSpinner && <Spinner color='blue' className='w-7 h-7' />}
            </div>
        </div>
    );
};

export default Login;
