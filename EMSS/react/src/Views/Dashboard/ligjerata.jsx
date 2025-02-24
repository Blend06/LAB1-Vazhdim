import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useStateContext } from "../../Contexts/ContextProvider.jsx";
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
    const endpoint = user?.Viti ? `/lenda/viti/${user.Viti}` : "/lenda";

    axiosClient
      .get(endpoint)
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
    <div className="container-fluid mt-30">
      <div className="row justify-content-center">
        <div className="col-md-50"> 
          <div className="card shadow-lg border-0 rounded-4 animated fadeInDown">
            <div className="card-header bg-secondary text-white text-center rounded-top">
              <h3 className="mb-40 fw-bold">Lendet</h3>
            </div>
            <div className="card-body p-4">
              {loading ? (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <ul className="list-group list-group-flush">
                  {Lenda.length > 0 ? (
                    Lenda.map((d) => (
                      <li key={d.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <Link to={`/dashboard/ligjerata/${d.emri}`} className="text-decoration-none text-dark fw-bold">
                          {d.emri}
                        </Link>
                        <span className="badge bg-primary rounded-pill">{d.viti || "N/A"}</span>
                      </li>
                    ))
                  ) : (
                    <p className="text-muted text-center">Nuk ka lende te disponueshme.</p>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
