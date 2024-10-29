import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useStateContext } from '../../Contexts/ContextProvider.jsx';

export default function Orariim() {
  const [Orari, setOrari] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useStateContext(); 

  useEffect(() => {
    if (user?.Viti) { 
      getOrari();
    }
  }, [user?.Viti]);
    
  const getOrari = () => {
    setLoading(true);
    axiosClient.get(`/orari/viti/${user.Viti}`)
      .then(({ data }) => {
        console.log("API Response:", data); 
        setOrari(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orari:", error);
        setLoading(false);
      });
  };

  return (
    <div className="container my-5"> {/* Centered container with margin on top and bottom */}
      <div className="text-center mb-4"> {/* Center-align header and add bottom margin */}
        <h1 style={{ fontWeight: 'bold' }}>Orari im</h1> {/* Bold header */}
      </div>
      <div className="card p-3 shadow-sm animated fadeInDown"> {/* Card with padding and shadow effect */}
        <table className="table table-striped table-bordered text-center"> {/* Bootstrap table with striping and borders */}
          <thead style={{ backgroundColor: '#178ca4', color: '#FFFFFF', fontWeight: 'bold' }}> {/* Inline styles for header */}
            <tr>
              <th>Ora</th>
              <th>Dita</th>
              <th>Lenda</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="3" className="text-center">Loading...</td> {/* Updated colspan to match number of columns */}
              </tr>
            </tbody>
          )}
          <tbody>
            {console.log("Rendered Orari:", Orari)}
            {Orari.map(d => (
              <tr key={d.id}>
                <td>{d.ora}</td>
                <td>{d.dita}</td>
                <td>{d.lenda}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
