import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useStateContext } from '../../Contexts/ContextProvider.jsx';

export default function Nota() {
  const [Nota, setNota] = useState([]);
  const[Average, setAverage] = useState(null);
  const [loading, setLoading] = useState(false);
  const {user} = useStateContext();


  useEffect(() => {
    getNota();
    getAverage();
  }, []);

  useEffect(() => {
    if (Average !== null) {
      updateStudentData();
    }
  }, [Average]);

  const getNota = () => {
    setLoading(true);
    axiosClient.get(`/nota/user/${user.id}`)
      .then(({ data }) => {
        console.log("API Response:", data); 
        setNota(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orari:", error);
        setLoading(false);
      });
  };

  const updateStudentData = async () => {

  try {
    const updateData = {
      Emri: user.Emri,
      Mbiemri: user.Mbiemri,
      email: user.email,
      password: user.password,
      Roli: 'Student',
      Mesatarja: Average
    };
    console.log(updateData);

    const response = await axiosClient.put(`/students/${user.id}`, updateData);
    console.log('Student updated successfully');
  } catch (error) {
    console.error('An error occurred:', error);
  }  
};


  const getAverage = () => {
    setLoading(true);
    axiosClient.get(`/average/user/${user.id}`)
      .then(({ data }) => {
        console.log("API Response:", data); 
        setAverage(data.average_nota);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orari:", error);
        setLoading(false);
      });
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-4"> 
        <h1 style={{ fontWeight: 'bold' }}>Nota</h1> 
      </div>
      <div className="card p-3 shadow-sm animated fadeInDown">
        <table className="table table-striped table-bordered text-center"> 
          <thead style={{ backgroundColor: '#178ca4', color: '#FFFFFF', fontWeight: 'bold' }}> 
            <tr>
              <th>User_Id</th>
              <th>Lenda</th>
              <th>Nota</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="7" className="text-center">Loading...</td>
              </tr>
            </tbody>
          )}
          <tbody>
            {Nota.map(d => (
              <tr key={d.id}>
                <td>{d.user_id}</td>
                <td>{d.Lenda}</td>
                <td>{d.Nota}</td> 
          
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center mt-4">
          <h5>Mesatarja: {Average !== null ? Average : "No data available"}</h5>
        </div>
      </div>
    </div>
  );
}
