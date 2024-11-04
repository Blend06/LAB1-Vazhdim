import { useStateContext } from '../../Contexts/ContextProvider.jsx';
import styles from './dashboard.module.css';

export default function Profile() {
    const  { user } = useStateContext();
    return (
        <>
        { user.Roli === 'Student' ? (
          <>
          <div className={styles.profileDashboard}>
          <div className={styles.profileInfo}>
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