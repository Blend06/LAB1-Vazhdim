import React from 'react';
import styles from './dashboard.module.css';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../../Footer.jsx';

export default function Dashboard() {
    return  (
       <>
       <div className={styles.layout} style={{display : 'flex'}}>
       <aside className={styles.aside}>
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

