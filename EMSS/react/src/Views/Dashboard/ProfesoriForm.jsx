import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axios-client";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ProfesoriForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [Lenda, setLenda] = useState([]);
    const [user, setUser] = useState({
        id: null,
        Emri: '',
        Mbiemri: '',
        email: '',
        password: '',
        Specializimi: '',
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
            axiosClient.get(`/profesori/${id}`)
                .then(({ data }) => {
                    console.log('API Response:', data);
                    setUser({
                        id: data.id,
                        Emri: data.Emri,
                        Mbiemri: data.Mbiemri,
                        email: data.email,
                        password: '',
                        Specializimi: data.Specializimi,
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
            Emri: user.Emri,
            Mbiemri: user.Mbiemri,
            email: user.email,
            password: user.password,
            Specializimi: user.Specializimi,
            Roli: 'Profesor',
        };

        console.log('Update Data:', updateData);

        if (user.password) {
            updateData.password = user.password;
        }

        if (user.id) {
            axiosClient.put(`/profesori/${user.id}`, updateData)
                .then(() => {
                    navigate('/dashboard/profesori');
                })
                .catch(err => {
                    console.error('An error occurred:', err);
                });
        } else {
            axiosClient.post(`/profesori/`, updateData)
                .then(() => {
                    navigate('/dashboard/profesori');
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
                    <h1 className="text-center">{user.id ? `Update User: ${user.Emri}` : 'Create User'}</h1>
                    <form onSubmit={onSubmit} className="text-center">
                        <div className="mb-3">
                            <input 
                                type="text"
                                className="form-control"
                                value={user.Emri} 
                                onChange={ev => setUser({ ...user, Emri: ev.target.value })} 
                                placeholder="Emri"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input 
                                type="text"
                                className="form-control"
                                value={user.Mbiemri} 
                                onChange={ev => setUser({ ...user, Mbiemri: ev.target.value })} 
                                placeholder="Mbiemri" 
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input 
                                type="email"
                                className="form-control"
                                value={user.email} 
                                onChange={ev => setUser({ ...user, email: ev.target.value })} 
                                placeholder="Email" 
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input 
                                type="password"
                                className="form-control"
                                value={user.password}
                                onChange={ev => setUser({...user, password: ev.target.value})}
                                placeholder="Password"
                            />
                        </div>
                        <div className="mb-3">
                        <select 
                                className="form-control"
                                value={user.Specializimi} 
                                onChange={ev => setUser({ ...user, Specializimi: ev.target.value })} 
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
                        <button className="btn btn-primary w-100">Save</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}
