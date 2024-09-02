import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './loginregister.module.css';
import Footer from '../../Footer.jsx';
import axiosClient from '../../axios-client.js';
import { useStateContext } from '../../Contexts/ContextProvider.jsx';

export default function Register() {
    const nameRef = useRef();
    const mbiemriRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const roliRef = useRef();

    const { setUser, setToken } = useStateContext();
    const navigate = useNavigate();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            Emri: nameRef.current.value, 
        Mbiemri: mbiemriRef.current.value,  
        email: emailRef.current.value,
        password: passwordRef.current.value,
        Roli: roliRef.current.value || 'Student',
        };
        console.log("Payload:", payload);  
        axiosClient.post('/register', payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);

                if(data.token){
                    console.log("Token set:", data.token);
                    navigate('/');
                }
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log("Validation Errors:", response.data.errors);
                } else {
                    console.error('An unexpected error occurred:', err);
                }
            });
    };

    

    return (
        <>
            <section className={styles.Register} id="Register">
                <div className={styles.wrapper} style={{ marginTop: '200px' }}>
                    <div className={`${styles.formBox} ${styles.register}`}>
                        <h2 className={styles.title2}>Registration</h2>
                        <form onSubmit={onSubmit}>
                            <div className={styles.inputBox}>
                                <span className={styles.icon}><ion-icon name="person"></ion-icon></span>
                                <input ref={nameRef} type="text" name="name" required />
                                <label>Name</label>
                            </div>
                            <div className={styles.inputBox}>
                                <span className={styles.icon}><ion-icon name="person"></ion-icon></span>
                                <input ref={mbiemriRef} type="text" name="mbiemri" required />
                                <label>Surname</label>
                            </div>
                            <div className={styles.inputBox}>
                                <span className={styles.icon}><ion-icon name="mail"></ion-icon></span>
                                <input ref={emailRef} type="email" name="email" required />
                                <label>Email</label>
                            </div>
                            <div className={styles.inputBox}>
                                <span className={styles.icon}><ion-icon name="lock-closed"></ion-icon></span>
                                <input ref={passwordRef} type="password" name="password" required />
                                <label>Password</label>
                            </div>
                            <div className={`${styles.inputBox} ${styles.userAdmin}`} style={{ display: 'none' }}>
                                <option ref={roliRef} >Student</option>
                            </div>
                            <button type="submit" name="register-submit" className={styles.buttoniLogin}>Register</button>
                        </form>
                        <div className={styles.loginShift}>
                            <p>Back to <button className={styles.loginLink} style={{ background: 'none', textDecoration: 'none', border: 'none' }}><Link to="/login">Log in</Link></button></p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
