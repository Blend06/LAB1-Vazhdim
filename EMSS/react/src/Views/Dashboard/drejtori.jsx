import { useEffect, useState } from "react"
import axiosClient from "../../axios-client";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Drejtori() {
  const [drejtori, setDrejtori] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDrejtori();
  }, []);

  const onDelete = (d) => {
    if (!window.confirm("Are you sure you want to delete this director?")) {
      return;
    }
    axiosClient.delete(`/drejtori/${d.id}`)
      .then(() => {
        getDrejtori(); 
      })
      .catch((error) => {
        console.error("Error deleting director:", error.response.status, error.response.data);
      });
  };

  const getDrejtori = () => {
    setLoading(true);
    axiosClient.get('/drejtori')
      .then(({ data }) => {
        setLoading(false);
        setDrejtori(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Drejtori</h1>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>Emri</th>
              <th>Mbiemri</th>
              <th>Email</th>
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
            {drejtori.map(d => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.Emri}</td>
                <td>{d.Mbiemri}</td>
                <td>{d.email}</td>
                <td>
                  <Link className="btn btn-primary btn-sm" to={`/dashboard/drejtori/${d.id}`}>Edit</Link>
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
