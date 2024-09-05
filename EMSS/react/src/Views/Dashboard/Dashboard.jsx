import React from 'react';
import styles from './dashboard.module.css';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../../Footer.jsx';
import Header from '../../Header.jsx';

export default function Dashboard() {
    return  (
       <>
       <Header /> 
       <div className={styles.layout} style={{display : 'flex'}}>
       <aside className={styles.aside} style={{ backgroundColor: '#178ca4', borderRadius: '5px' }}>
        <Link to="/dashboard/profile">Profile</Link>
        <Link to="/dashboard/student">Student</Link>
        <Link to="/dashboard/professor">Professor</Link>
        <Link to="/dashboard/drejtor">Drejtor</Link>
        <Link to="/dashboard/viti">Viti</Link>
        <Link to="/dashboard/zgjedhvitin">Perzgjedh vitin </Link>

       </aside>
       <main>
        <Outlet/>
       </main>
       </div>
       <Footer/>
        </>
    );
}

