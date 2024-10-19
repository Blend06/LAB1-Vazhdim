import { useEffect, useState } from "react"
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
    if (!window.confirm("Are you sure you want to delete this director?")) {
      return;
    }
    axiosClient.delete(`/lenda/${d.id}`)
      .then(() => {
        getLenda(); 
      })
      .catch((error) => {
        console.error("Error deleting director:", error.response.status, error.response.data);
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
    <div>
      <h1>Lenda</h1>
      <Link to={"/dashboard/lenda/new"}>Add new</Link>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Emri</th>
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
            {Lenda.map(d => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.emri}</td>
                <td>{d.viti}</td>
                <td>{d.created_at}</td>
                <td>
                  <Link className="btn btn-primary btn-sm" to={`/dashboard/lenda/${d.id}`}>Edit</Link>
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
