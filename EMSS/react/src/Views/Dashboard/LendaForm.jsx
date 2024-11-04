import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axios-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './dashboard.module.css';

export default function LendaForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [lenda, setLenda] = useState({
        id: null,
        emri: '',
        viti: '',
    });

    useEffect(() => {
        if (id) {
            axiosClient.get(`/lenda/${id}`)
                .then(({ data }) => {
                    console.log('API Response:', data);
                    setLenda({
                        id: data.id,
                        emri: data.emri,
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
            emri: lenda.emri,
            viti: lenda.viti
        };

        console.log('Update Data:', updateData);

        if (lenda.id) {
            axiosClient.put(`/lenda/${lenda.id}`, updateData)
                .then(() => {
                    navigate('/dashboard/lenda');
                })
                .catch(err => {
                    console.error('An error occurred:', err);
                });
        } else {
            axiosClient.post(`/lenda/`, updateData)
                .then(() => {
                    navigate('/dashboard/lenda');
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
                    <h1 className="text-center">{lenda.id ? `Update lenda: ${lenda.emri}` : 'Create lenda'}</h1>
                    <form onSubmit={onSubmit} className="text-center">
                        <div className="mb-3">
                            <input 
                                type="text"
                                className="form-control"
                                value={lenda.emri} 
                                onChange={ev => setLenda({ ...lenda, emri: ev.target.value })} 
                                placeholder="Emri"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input 
                                type="text"
                                className="form-control"
                                value={lenda.viti} 
                                onChange={ev => setLenda({ ...lenda, viti: ev.target.value })} 
                                placeholder="Viti" 
                                required
                            />
                        </div>
                        <button className="btn btn-primary w-100">Save</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}
