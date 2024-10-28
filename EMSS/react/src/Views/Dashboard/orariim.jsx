import { useEffect, useState } from "react"
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
    <div>
      <h1>Orari im</h1>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>Ora</th>
              <th>Dita</th>
              <th>Lenda</th>
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
          {console.log("Rendered Orari:", Orari)}
            {Orari.map(d => (
            <tr key={d.id}>
            <td>{d.ora}</td>
            <td>{d.dita}</td>
            <td>{d.lenda}</td>
      </tr>
          )) 
        }
</tbody>
        </table>
      </div>
    </div>
  );
}
