import { useEffect, useState } from "react"
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
    if (!window.confirm("Are you sure you want to delete this director?")) {
      return;
    }
    axiosClient.delete(`/orari/${d.id}`)
      .then(() => {
        getOrari(); 
      })
      .catch((error) => {
        console.error("Error deleting director:", error.response.status, error.response.data);
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
    <div>
      <h1>Orari</h1>
      <Link to={"/dashboard/orari/new"}>Add new</Link>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ora</th>
              <th>Dita</th>
              <th>Lenda</th>
              <th>Viti</th>
              <th>Created_at</th>
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
            {Orari.map(d => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.ora}</td>
                <td>{d.dita}</td>
                <td>{d.lenda}</td>
                <td>{d.viti}</td>
                <td>{d.created_at}</td>
                <td>
                  <Link className="btn btn-primary btn-sm" to={`/dashboard/orari/${d.id}`}>Edit</Link>
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
