import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Profesori() {
  const [profesori, setProfesori] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProfesori();
  }, []);

  const onDelete = (p) => {
    if (!window.confirm("Are you sure you want to delete this profesor?")) {
      return;
    }
    axiosClient.delete(`/profesori/${p.id}`) // Changed 'd' to 'p'
      .then(() => {
        getProfesori(); 
      })
      .catch((error) => {
        console.error("Error deleting Profesor:", error.response.status, error.response.data);
      });
  };

  const getProfesori = () => {
    setLoading(true);
    axiosClient.get('/profesori')
      .then(({ data }) => {
        setLoading(false);
        setProfesori(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container my-5"> {/* Centered container with margin on top and bottom */}
      <div className="text-center mb-4"> {/* Center-align header and link, add bottom margin */}
        <h1 style={{ fontWeight: 'bold' }}>Profesori</h1> {/* Bold header */}
        <Link to={"/dashboard/profesori/new"} className="btn btn-success my-3">Add New</Link> {/* Button styling */}
      </div>
      <div className="card p-3 shadow-sm animated fadeInDown"> {/* Card with padding and shadow effect */}
        <table className="table table-striped table-bordered text-center"> {/* Bootstrap table with striping and borders */}
          <thead style={{ backgroundColor: '#178ca4', color: '#FFFFFF', fontWeight: 'bold' }}> {/* Inline styles for header */}
            <tr>
              <th>ID</th>
              <th>Emri</th>
              <th>Mbiemri</th>
              <th>Email</th>
              <th>Specializimi</th>
              <th>Created_at</th>
              <th>Actions</th>
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
            {profesori.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.Emri}</td>
                <td>{p.Mbiemri}</td>
                <td>{p.email}</td>
                <td>{p.Specializimi}</td>
                <td>{p.created_at}</td>
                <td>
                  <Link className="btn btn-primary btn-sm me-2" to={`/dashboard/profesori/${p.id}`}>Edit</Link> {/* Added margin to button */}
                  <button onClick={() => onDelete(p)} className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
