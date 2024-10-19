import React, { useEffect } from 'react';
import styles from './dashboard.module.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Footer from '../../Footer.jsx';
import Header from '../../Header.jsx';
import { useStateContext } from '../../Contexts/ContextProvider.jsx';

export default function Dashboard() {
    const {token, user} = useStateContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);
    return  (
       <>
       <Header /> 
       <div className={styles.layout} style={{display : 'flex'}}>
       <aside className={styles.aside} style={{ backgroundColor: '#178ca4', borderRadius: '5px', height: '1000px' }}>
        <Link to="/dashboard/profile">Profile</Link>
        <Link to="/dashboard/student">Student</Link>
        <Link to="/dashboard/profesori">Professor</Link>
        <Link to="/dashboard/drejtori">Drejtor</Link>
        {user.Viti === null ? ( <Link to="/dashboard/zgjedhvitin">Perzgjedh vitin </Link> ) :
        (<Link to="/dashboard/viti">Viti</Link> )}
        
        
       </aside>
       <main>
        <Outlet/>
       </main>
       </div>
       <Footer/>
        </>
    );
}

