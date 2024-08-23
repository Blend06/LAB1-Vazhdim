import React, { useRef, useState } from 'react';
import styles from './loginregister.module.css'; 
import Footer from '../../Footer.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../../Contexts/ContextProvider.jsx';
import axiosClient from '../../axios-client.js';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const { setUser, setToken} = useStateContext();
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = (ev) => {
        ev.preventDefault();
        setLoading(true);
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        console.log("Payload:", payload);
        axiosClient.post('/login', payload)
        .then(({ data }) => {
            console.log("Response data:", data);
            setUser(data.user);
           setToken(data.token);
           
            navigate('/');
        
        })
          .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
                console.log("Validation Errors:", response.data.errors);
                setError(response.data.errors);
            } else {
                console.error('An unexpected error occurred:', err);
                setError('An unexpected error occurred');
            }
            setLoading(false);
        });

        

    };

    // Utility function to handle error formatting
    const formatError = (error) => {
        if (typeof error === 'string') {
            return error;
        }
        if (typeof error === 'object') {
            return Object.entries(error).map(([key, value]) => (
                <div key={key}>
                    <strong>{key}:</strong> {value.join(', ')}
                </div>
            ));
        }
        return 'An unexpected error occurred';
    };

    return (
        <>
            <div>
                <section className={styles.Login} id="Login">
                    <div className={styles.wrapper}>
                        <div className={`${styles.formBox} ${styles.login}`}>
                            <h2 className={styles.title1}><strong style={{color: '#178ca4'}}>Log in</strong></h2>
                            <form onSubmit={onSubmit}>
                                <div className={styles.inputBox}>
                                    <span className={styles.icon}><ion-icon name="mail"></ion-icon></span>
                                    <input ref={emailRef} type="email" name="email" required />
                                    <label>Email</label>
                                </div>
                                <div className={styles.inputBox}>
                                    <span className={styles.icon}>
                                        <ion-icon name="lock-closed"></ion-icon>
                                    </span>
                                    <input ref={passwordRef} type="password" name="password" required />
                                    <label>Password</label>
                                </div>
                                <button type="submit" name="login-submit" className={styles.buttoniLogin}>Login</button>
                                {error && <div style={{ color: 'red' }}>{formatError(error)}</div>}
                                {loading && <p>Loading...</p>}
                            </form>
                            <div className={styles.loginRegister}>
                                <p>Don't have an account <button className={styles.registerLink} style={{background: 'none', textDecoration: 'none', border: 'none'}}>
                                    <Link to ="/register">Register</Link></button></p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}
