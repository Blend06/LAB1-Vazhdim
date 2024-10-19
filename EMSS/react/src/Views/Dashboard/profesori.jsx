import { useEffect, useState } from "react"
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
    axiosClient.delete(`/profesori/${d.id}`)
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
    <div>
      <h1>Profesori</h1>
      <Link to={"/dashboard/profesori/new"}>Add new</Link>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Emri</th>
              <th>Mbiemri</th>
              <th>Email</th>
              <th>Specializimi</th>
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
            {profesori.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.Emri}</td>
                <td>{p.Mbiemri}</td>
                <td>{p.email}</td>
                <td>{p.Specializimi}</td>
                <td>{p.created_at}</td>
                <td>
                  <Link className="btn btn-primary btn-sm" to={`/dashboard/profesori/${p.id}`}>Edit</Link>
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
