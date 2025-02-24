import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useStateContext } from "../../Contexts/ContextProvider.jsx";
import { useParams } from "react-router-dom";
import { FaTrash, FaDownload, FaFilePdf } from "react-icons/fa"; // Import icons
import styles from "./dashboard.module.css";

export default function LigjerataPage() {
  const { Lenda } = useParams();
  const [Ligjerata, setLigjerata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formPath, setFormPath] = useState({ path: "", Emri: "" });
  const { user } = useStateContext();

  useEffect(() => {
    getLigjerata();
  }, []);

  const getLigjerata = () => {
    setLoading(true);
    axiosClient
      .get(`/ligjerata/lenda/${Lenda}`)
      .then(({ data }) => {
        console.log("API Response:", data);
        setLigjerata(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Ligjerata:", error);
        setLoading(false);
      });
  };

  const onDelete = (d) => {
    if (!window.confirm("Are you sure you want to delete this lecture?")) {
      return;
    }
    axiosClient
      .delete(`/ligjerata/${d.id}`)
      .then(() => {
        getLigjerata();
      })
      .catch((error) => {
        console.error("Error deleting lecture:", error.response?.status, error.response?.data);
      });
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const updateData = {
      path: formPath.path,
      Emri: formPath.Emri,
      Lenda: user.Specializimi,
    };

    if (Ligjerata.id) {
      axiosClient
        .put(`/ligjerata/${Ligjerata.id}`, updateData)
        .then(() => {
          getLigjerata();
        })
        .catch((err) => {
          console.error("An error occurred:", err);
        });
    } else {
      axiosClient
        .post(`/ligjerata/`, updateData)
        .then(() => {
          getLigjerata();
        })
        .catch((err) => {
          console.error("An error occurred:", err);
        });
    }
  };

  return (
    <div className="container mt-5">
      {/* Title */}
      <h1 className="fw-bold text-center mb-4">Ligjeratat</h1>

      {/* Form: Only visible if the user specializes in this subject */}
      {user.Specializimi === Lenda && (
        <form onSubmit={onSubmit} className="bg-light p-4 rounded shadow-sm mb-4">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={formPath.path}
              onChange={(ev) => setFormPath({ ...formPath, path: ev.target.value })}
              placeholder="Enter file path"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={formPath.Emri}
              onChange={(ev) => setFormPath({ ...formPath, Emri: ev.target.value })}
              placeholder="Enter lecture name"
              required
            />
          </div>
          <button className="btn btn-primary w-100">Save</button>
        </form>
      )}

      {/* Lecture List */}
      <div className="row">
        {Ligjerata.map((d) => (
          <div key={d.id} className="col-md-6">
            <div className="card shadow-sm mb-3">
              <div className="card-body d-flex align-items-center justify-content-between">
                {/* Lecture Info */}
                <div className="d-flex align-items-center">
                  <a href={`/${d.path}`} target="_blank" rel="noopener noreferrer" className="me-3">
                    <FaFilePdf size={40} color="#d32f2f" />
                  </a>
                  <span className="fw-bold">{d.Emri}</span>
                </div>

                {/* Actions */}
                <div>
                  {user.Specializimi === Lenda && (
                    <button className="btn btn-danger me-2" onClick={() => onDelete(d)}>
                      <FaTrash />
                    </button>
                  )}
                  <a href={`/${d.path}`} download className="btn btn-primary">
                    <FaDownload />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loader */}
      {loading && <p className="text-center">Loading...</p>}
    </div>
  );
}
