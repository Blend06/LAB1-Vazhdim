import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Orari() {
  const [Orari, setOrari] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getOrari();
  }, []);

  const onDelete = (d) => {
    if (!window.confirm("Are you sure you want to delete this schedule entry?")) {
      return;
    }
    axiosClient.delete(`/orari/${d.id}`)
      .then(() => {
        getOrari(); 
      })
      .catch((error) => {
        console.error("Error deleting schedule entry:", error.response.status, error.response.data);
      });
  };

  const getOrari = () => {
    setLoading(true);
    axiosClient.get('/orari')
      .then(({ data }) => {
        setLoading(false);
        setOrari(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container my-5"> {/* Centered container with margin on top and bottom */}
      <div className="text-center mb-4"> {/* Center-align header and link, add bottom margin */}
        <h1 style={{ fontWeight: 'bold' }}>Orari</h1> {/* Bold header */}
        <Link to={"/dashboard/orari/new"} className="btn btn-success my-3">Add New</Link> {/* Button styling */}
      </div>
      <div className="card p-3 shadow-sm animated fadeInDown"> {/* Card with padding and shadow effect */}
        <table className="table table-striped table-bordered text-center"> {/* Bootstrap table with striping and borders */}
          <thead style={{ backgroundColor: '#178ca4', color: '#FFFFFF', fontWeight: 'bold' }}> {/* Inline styles for header */}
            <tr>
              <th>ID</th>
              <th>Ora</th>
              <th>Dita</th>
              <th>Lenda</th>
              <th>Viti</th>
              <th>Created_at</th>
              <th>Actions</th> {/* Added Actions column */}
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="7" className="text-center">Loading...</td> {/* Updated colspan to match number of columns */}
              </tr>
            </tbody>
          )}
          <tbody>
            {Orari.map(d => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.ora}</td>
                <td>{d.dita}</td>
                <td>{d.lenda}</td>
                <td>{d.viti}</td>
                <td>{d.created_at}</td>
                <td>
                  <Link className="btn btn-primary btn-sm me-2" to={`/dashboard/orari/${d.id}`}>Edit</Link> {/* Added margin to button */}
                  <button onClick={() => onDelete(d)} className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
