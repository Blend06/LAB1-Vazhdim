import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axios-client";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function StudentForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: null,
        Emri: '',
        Mbiemri: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        if (id) {
            axiosClient.get(`/students/${id}`)
                .then(({ data }) => {
                    console.log('API Response:', data);
                    setUser({
                        id: data.id,
                        Emri: data.Emri,
                        Mbiemri: data.Mbiemri,
                        email: data.email,
                        password: '',
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
            Roli: 'Student',
        };

        console.log('Update Data:', updateData);

        if (user.password) {
            updateData.password = user.password;
        }

        if (user.id) {
            axiosClient.put(`/students/${user.id}`, updateData)
                .then(() => {
                    navigate('/dashboard/student');
                })
                .catch(err => {
                    console.error('An error occurred:', err);
                });
        } else {
            axiosClient.post(`/students/`, updateData)
                .then(() => {
                    navigate('/dashboard/student');
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
                        <button className="btn btn-primary w-100">Save</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}
