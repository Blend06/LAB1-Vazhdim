import { useStateContext } from '../../Contexts/ContextProvider.jsx';
import styles from './dashboard.module.css';
import { useEffect, useState } from "react";


export default function Profile() {
    const  { user, setUser } = useStateContext();

    useEffect(() => {
        setUser(user); // Initialize local state with context user data
    }, [user]);
    return (
        <>
        { user.Roli === 'Student' ? (
          <>
          <div className={styles.profileDashboard}>
          <div className={styles.profileInfo}>
          <div className={styles.profileDashboard}></div>
          <p>ID: {user.id}</p>
            <p>Emri: {user.Emri}</p>
            <p>Mbiemri: {user.Mbiemri}</p>
            <p>Viti: {user.Viti}</p>
            <p>Email: {user.email}</p>
            <p>Nota mesatare: {user.Mesatarja}</p>
          </div>
        </div>

        
        
        </>

        
        ) : (
          <>
          <div className={styles.profileDashboard}>
          <div className={styles.profileInfo}>
          <div className={styles.profileDashboard}></div>
            <p>Emri: {user.Emri}</p>
            <p>Mbiemri: {user.Mbiemri}</p>
            <p>Email: {user.email}</p>
            <p>Specializimi: {user.Specializimi}</p>
          </div>
        </div>
          </>
        )
      }
         
         
        </>
        
    )
    
}