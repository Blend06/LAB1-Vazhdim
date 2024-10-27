import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axios-client";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function OrariForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [Lenda, setLenda] = useState([]);
    const [Orari, setOrari] = useState({
        id: null,
        ora: '',
        dita: '',
        lenda: '',
        viti: '',
    });

    useEffect(() => {
        getLenda();
      }, []);

      const getLenda = () => {
        
        axiosClient.get('/lenda')
          .then(({ data }) => {
            setLenda(data.data);
          })
          .catch(() => {
          });
      };

    useEffect(() => {
        if (id) {
            axiosClient.get(`/orari/${id}`)
                .then(({ data }) => {
                    console.log('API Response:', data);
                    setOrari({
                        id: data.id,
                        ora: data.ora,
                        dita: data.dita,
                        lenda: data.lenda,
                        viti: data.viti
                    });
                })
                .catch((error) => {
                    console.log('Error:', error);
                });
        }
    }, [id]);

    const onSubmit = (ev) => {
        ev.preventDefault();
        const updateData = {
            ora: Orari.ora,
            dita: Orari.dita,
            lenda: Orari.lenda,
            viti: Orari.viti
        };

        console.log('Update Data:', updateData);

        if (Orari.id) {
            axiosClient.put(`/orari/${Orari.id}`, updateData)
                .then(() => {
                    navigate('/dashboard/orari');
                })
                .catch(err => {
                    console.error('An error occurred:', err);
                });
        } else {
            axiosClient.post(`/orari/`, updateData)
                .then(() => {
                    navigate('/dashboard/orari');
                })
                .catch(err => {
                    console.error('An error occurred:', err);
                });
        }
    };

    return (
        <>
           <div className="d-flex align-items-center justify-content-center " style={{ height: '100vh' }}>
            <div className="card animated FadeInDown" style={{ width: '400px' }}>
                <div className="card-body">
                    <h1 className="text-center">{Orari.id ? `Update Orari: ${Orari.id}` : 'Create Orari'}</h1>
                    <form onSubmit={onSubmit} className="text-center">
                        <div className="mb-3">
                            <select 
                                className="form-control"
                                value={Orari.ora} 
                                onChange={ev => setOrari({ ...Orari, ora: ev.target.value })} 
                                required
                            >
                                <option value="" disabled>Zgjidh oren</option>
                                <option value="9:00-10:30">9:00-10:30</option>
                                <option value="10:40-12:10">10:40-12:10</option>
                                <option value="12:40-14:10">12:40-14:10</option>
                                <option value="14:20-15:50">14:20-15:50</option>

                                </select>
                        </div>
                        <div className="mb-3">
                            <select 
                                className="form-control"
                                value={Orari.dita} 
                                onChange={ev => setOrari({ ...Orari, dita: ev.target.value })} 
                                required
                            >
                                <option value="" disabled>Zgjidh Diten</option>
                                <option value="E Hene">E hene</option>
                                <option value="E Marte">E Marte</option>
                                <option value="E Merkure">E Merkure</option>
                                <option value="E Enjte">E Enjte</option>
                                <option value="E Premte">E Premte</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <select 
                                className="form-control"
                                value={Orari.lenda} 
                                onChange={ev => setOrari({ ...Orari, lenda: ev.target.value })} 
                                required
                            >
                                <option value="" disabled>Zgjidh Lenden</option>
                                {Lenda.map((Lenda) => (
                                    <option key={Lenda.id} value={Lenda.emri}>
                                     {Lenda.emri}
                                    </option>
                                    ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select 
                                className="form-control"
                                value={Orari.viti} 
                                onChange={ev => setOrari({ ...Orari, viti: ev.target.value })} 
                                required
                            >   
                            <option value="" disabled>Zgjidh vitin</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            </select>
                        </div>
                        <button className="btn btn-primary w-100">Save</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}
