import React, { useEffect } from 'react';
import styles from './styles.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useStateContext } from './Contexts/ContextProvider.jsx';

function Header() {
    const {token} = useStateContext();

    useEffect(() => {
        console.log("Token in Header updated:", token);
    }, [token]);
    
    return (
        <header className={`${styles.header} ${styles['d-flex']} ${styles['align-items-center']} ${styles['sticky-top']}`}>
            <div className={`${styles.container} ${styles['container-fluid']} ${styles['container-xl']} ${styles['position-relative']} ${styles['d-flex']} ${styles['align-items-center']}`}>
            <div className={`${styles.logo} ${styles['d-flex']} ${styles['align-items-center']} ${styles['me-auto']}`}>
                    <h1 className={styles.sitename}><strong style={{color: '#178ca4'}}>AcademixPro</strong> </h1>
                </div>
                <nav className={styles.navmenu}>
                    <ul>
                        <li><Link to="/" className={styles.active}>Home</Link></li>
                        <li><Link to="/aboutus">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        {token ? (
                            <>
                            <li><Link to="/dashboard">Profile</Link></li>
                            <button>Logout</button>
                        </>
                        ) : (
                            <li><Link to="/login">Profile</Link></li>
                        )}
                    </ul>
                    <i className={`bi bi-list ${styles['mobile-nav-toggle']} ${styles['d-xl-none']}`}></i>
                </nav>
            </div>
        </header>
    );
}

export default Header;
