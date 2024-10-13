import { useEffect, useState } from "react"
import axiosClient from "../../axios-client";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Student() {
   const [users, setUsers] = useState([]);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
    getUsers();
   }, [])

   const onDelete = (u) => {
    console.log("Delete button clicked for user:", u);
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return
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
    setLoading(true)
    axiosClient.get('/students')
    .then(({data}) => {
        setLoading(false)
        console.log(data);
        setUsers(data.data);
    })
    .catch(() => {
        setLoading(false)
    })
   }
   
    return (
        <>
        <div>
            <h1>Students</h1>
            <Link to={"/dashboard/student/new"}>Add new</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Emri</th>
                        <th>Mbiemri</th>
                        <th>Email</th>
                        <th>Viti</th>
                        <th>Created Date</th>
                        <th>Mesatarja</th>
                        </tr>
                    </thead>
                    {loading && 
                    <tbody>
                        <tr>
                            <td colSpan="5" className="text-center">
                                Loading...
                            </td>
                        </tr>
                    </tbody> 
                    }
                    <tbody>
                        {users.map(u=> (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.Emri}</td>
                                <td>{u.Mbiemri}</td>
                                <td>{u.email}</td>
                                <td>{u.Viti}</td>
                                <td>{u.created_at}</td>
                                <td>{u.Mesatarja}</td>
                                <td>
                                    <Link className="btn btn-primary btn-sm" to={'/dashboard/student/' + u.id}>Edit</Link>
                                    &nbsp;
                                    <button onClick={ev => onDelete(u)} className="btn btn-danger btn-sm">Delete</button>
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </>
    )
}