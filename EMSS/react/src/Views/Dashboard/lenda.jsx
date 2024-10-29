import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Lenda() {
  const [Lenda, setLenda] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLenda();
  }, []);

  const onDelete = (d) => {
    if (!window.confirm("Are you sure you want to delete this subject?")) {
      return;
    }
    axiosClient.delete(`/lenda/${d.id}`)
      .then(() => {
        getLenda(); 
      })
      .catch((error) => {
        console.error("Error deleting subject:", error.response.status, error.response.data);
      });
  };

  const getLenda = () => {
    setLoading(true);
    axiosClient.get('/lenda')
      .then(({ data }) => {
        setLoading(false);
        setLenda(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container my-5"> {/* Centered container with margin on top and bottom */}
      <div className="text-center mb-4"> {/* Center-align header and link, add bottom margin */}
      <h1 style={{ fontWeight: 'bold' }}>Lenda</h1>        <Link to={"/dashboard/lenda/new"} className="btn btn-success my-3">Add New</Link> {/* Button styling */}
      </div>
      <div className="card p-3 shadow-sm animated fadeInDown"> {/* Card with padding and shadow effect */}
        <table className="table table-striped table-bordered text-center"> {/* Bootstrap table with striping and borders */}
        <thead> 
            <tr>
              <th>ID</th>
              <th>Emri</th>
              <th>Viti</th>
              <th>Created_at</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">Loading...</td>
              </tr>
            </tbody>
          )}
          <tbody>
            {Lenda.map(d => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.emri}</td>
                <td>{d.viti}</td>
                <td>{d.created_at}</td>
                <td>
                  <Link className="btn btn-primary btn-sm me-2" to={`/dashboard/lenda/${d.id}`}>Edit</Link> {/* Added margin to button */}
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
