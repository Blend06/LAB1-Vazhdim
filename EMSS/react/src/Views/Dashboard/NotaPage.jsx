import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from '../../Contexts/ContextProvider.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NotaPage() {
  const [Nota, setNota] = useState([]);
  const  { user, setUser } = useStateContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNota();
  }, []);

  const onDelete = (d) => {
    if (!window.confirm("Are you sure you want to delete this subject?")) {
      return;
    }
    axiosClient.delete(`/nota/${d.id}`)
      .then(() => {
        getNota(); 
      })
      .catch((error) => {
        console.error("Error deleting subject:", error.response.status, error.response.data);
      });
  };

  const getNota = () => {
    setLoading(true);
    axiosClient.get(`/nota/lenda/${user.Specializimi}`)
      .then(({ data }) => {
        setLoading(false);
        setNota(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container my-5"> {/* Centered container with margin on top and bottom */}
      <div className="text-center mb-4"> {/* Center-align header and link, add bottom margin */}
      <h1 style={{ fontWeight: 'bold' }}>Nota</h1>        <Link to={"/dashboard/notapage/new"} className="btn btn-success my-3">Add New</Link> {/* Button styling */}
      </div>
      <div className="card p-3 shadow-sm animated fadeInDown"> {/* Card with padding and shadow effect */}
        <table className="table table-striped table-bordered text-center"> {/* Bootstrap table with striping and borders */}
        <thead> 
            <tr>
              <th>Student ID</th>
              <th>Lenda</th>
              <th>Nota</th>
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
            {Nota.map(d => (
              <tr key={d.id}>
                <td>{d.user_id}</td>
                <td>{d.Lenda}</td>
                <td>{d.Nota}</td>
                <td>
                  <Link className="btn btn-primary btn-sm me-2" to={`/dashboard/notapage/${d.id}`}>Edit</Link> {/* Added margin to button */}
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
