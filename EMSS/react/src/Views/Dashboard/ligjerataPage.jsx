import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useStateContext } from '../../Contexts/ContextProvider.jsx';
import { useParams, useNavigate } from "react-router-dom";
import styles from './dashboard.module.css';

export default function LigjerataPage() {
    const { Lenda } = useParams();
  const [Ligjerata, setLigjerata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formPath, setFormPath] = useState("");
  const navigate = useNavigate();


  const { user } = useStateContext(); 

  useEffect(() => {
      getLigjerata();
  }, []);
    
  const getLigjerata = () => {
    setLoading(true);
    axiosClient.get(`/ligjerata/lenda/${Lenda}`)
      .then(({ data }) => {
        console.log("API Response:", data); 
        setLigjerata(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Ligjerata:", error);
        setLoading(false);
      });
  }

  const onDelete = (d) => {
    if (!window.confirm("Are you sure you want to delete this subject?")) {
      return;
    }
    console.log("Attempting to delete item with ID:", d.id);
    axiosClient.delete(`/ligjerata/${d.id}`)
      .then(() => {
        getLigjerata(); 
      })
      .catch((error) => {
        console.error("Error deleting subject:", error.response.status, error.response.data);
      });
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const updateData = {
        path: formPath.path,
        Emri: formPath.Emri,
        Lenda: user.Specializimi
    };

    console.log('Update Data:', updateData);

    if (Ligjerata.id) {
        axiosClient.put(`/ligjerata/${Ligjerata.id}`, updateData)
            .then(() => {
              getLigjerata();
            })
            .catch(err => {
                console.error('An error occurred:', err);
            });
    } else {
        axiosClient.post(`/ligjerata/`, updateData)
            .then(() => {
              getLigjerata();
            })
            .catch(err => {
                console.error('An error occurred:', err);
            });
    }
};

  return (
    <>
    { user.Specializimi === Lenda ? (
      <>
      <form onSubmit={onSubmit} className="text-center">
                        <div className="mb-3">
                            <input 
                                type="text"
                                className="form-control"
                                value={formPath.path} 
                                onChange={ev => setFormPath({ ...formPath, path: ev.target.value })} 
                                placeholder="path"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input 
                                type="text"
                                className="form-control"
                                value={formPath.Emri} 
                                onChange={ev => setFormPath({ ...formPath, Emri: ev.target.value })} 
                                placeholder="Emri"
                                required
                            />
                        </div>
                        <button className="btn btn-primary w-100">Save</button>
                    </form>
      </>
    ): (
      <>
      </>
    )}
    
    <>
      <h1 style={{ fontWeight: 'bold' }}>Ligjeratat</h1>
        {
  Ligjerata.map((d) => (
    <div key={d.id} className="mb-3">
      <div className={styles.containerLigjerata} style={{display: 'flex', justifyContent: 'space-between', width: '900px'}}>
       <div style={{display: 'flex'}}>
        <a href={`/${d.path}`} target="_blank" rel="noopener noreferrer" style={{ width: '50px', height: '50px' }}>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg" 
            alt="PDF Icon" 
            style={{ width: '50px', height: '50px' }}
          />
        </a>
        <p>{d.Emri}</p>
        </div>
        <div style={{display: 'flex'}}>
        { user.Specializimi === Lenda ? (
      <>
      <a href="#" onClick={() => onDelete(d)} style={{ textDecoration: 'none', color: 'red', fontWeight: 'bold', marginLeft: '10px' }}>Delete</a>
      </>
    ): (
      <>
      </>
    )}
        <a href={`/${d.path}`} download style={{ textDecoration: 'none', color: 'blue', fontWeight: 'bold', marginLeft: '10px' }}>
          Download
        </a>
        </div>
      </div>
      <hr />
    </div>
  ))
}   
</>
</>
  );
  
}
