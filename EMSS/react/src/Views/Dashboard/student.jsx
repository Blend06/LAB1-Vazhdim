import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Student() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const onDelete = (u) => {
    console.log("Delete button clicked for user:", u);
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    axiosClient.delete(`/students/${u.id}`)
      .then(() => {
        // TODO: show notification
        getUsers();
      })
      .catch((error) => {
        console.error("Error deleting student:", error.response.status, error.response.data);
      });
  };

  const getUsers = () => {
    setLoading(true);
    axiosClient.get('/students')
      .then(({ data }) => {
        setLoading(false);
        console.log(data);
        setUsers(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container my-5"> {/* Centered container with margin on top and bottom */}
      <div className="text-center mb-4"> {/* Center-align header and link, add bottom margin */}
        <h1 style={{ fontWeight: 'bold' }}>Students</h1> {/* Bold header */}
        <Link to={"/dashboard/student/new"} className="btn btn-success my-3">Add New</Link> {/* Button styling */}
      </div>
      <div className="card p-3 shadow-sm animated fadeInDown"> {/* Card with padding and shadow effect */}
        <table className="table table-striped table-bordered text-center"> {/* Bootstrap table with striping and borders */}
          <thead style={{ backgroundColor: '#178ca4', color: '#FFFFFF', fontWeight: 'bold' }}> {/* Inline styles for header */}
            <tr>
              <th>ID</th>
              <th>Emri</th>
              <th>Mbiemri</th>
              <th>Email</th>
              <th>Viti</th>
              <th>Created Date</th>
              <th>Mesatarja</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="8" className="text-center">Loading...</td> {/* Updated colspan to match number of columns */}
              </tr>
            </tbody>
          )}
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.Emri}</td>
                <td>{u.Mbiemri}</td>
                <td>{u.email}</td>
                <td>{u.Viti}</td>
                <td>{u.created_at}</td>
                <td>{u.Mesatarja}</td>
                <td>
                  <Link className="btn btn-primary btn-sm me-2" to={`/dashboard/student/${u.id}`}>Edit</Link> {/* Added margin to button */}
                  <button onClick={() => onDelete(u)} className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
