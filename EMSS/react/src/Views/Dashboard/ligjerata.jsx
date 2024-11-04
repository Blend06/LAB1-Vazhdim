import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useStateContext } from '../../Contexts/ContextProvider.jsx';
import { Link } from "react-router-dom";

export default function Ligjerata() {
  const [Lenda, setLenda] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useStateContext(); 

  useEffect(() => {
    getLenda();
  }, [user?.Viti]);
  
  const getLenda = () => {
    setLoading(true);
    const endpoint = user?.Viti ? `/lenda/viti/${user.Viti}` : '/lenda'; // Check if Viti exists
  
    axiosClient.get(endpoint)
      .then(({ data }) => {
        console.log("API Response:", data);
        setLenda(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching lenda:", error);
        setLoading(false);
      });
  };
  

  return (
    <div className="text-center mb-4">
      <h1 style={{ fontWeight: 'bold' }}>Lendet</h1>
      <div className="container-fluid" style={{ maxWidth: '600px' }}> 
        <div className="card p-4 shadow-sm animated fadeInDown">
          {
            Lenda.map(d => (
              <div key={d.id} className="mb-3">
                <Link to={`/dashboard/ligjerata/${d.emri}`} className="d-block">
                  {d.emri}
                </Link>
                <hr />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
  
}
