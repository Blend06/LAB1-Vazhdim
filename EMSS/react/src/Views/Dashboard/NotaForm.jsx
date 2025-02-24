import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useStateContext } from '../../Contexts/ContextProvider.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function NotaForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const  { user, setUser } = useStateContext();
    const [Nota, setNota] = useState({
        id: null,
        user_id: '',
        Lenda: '',
        Nota: '',
    });

    useEffect(() => {
        getStudents();
      }, []);

    const getStudents = () => {
        
        axiosClient.get('/students')
          .then(({ data }) => {
            
            console.log(data);
            setStudents(data.data);
          })
          .catch(() => {
            
          });
      };

    useEffect(() => {
        if (id) {
            axiosClient.get(`/nota/${id}`)
                .then(({ data }) => {
                    console.log('API Response:', data);
                    setNota({
                        id: data.id,
                        user_id: data.user_id,
                        Lenda: data.Lenda,
                        Nota: data.Nota
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
            user_id: Nota.user_id,
            Lenda: user.Specializimi,
            Nota: Nota.Nota
        };

        console.log('Update Data:', updateData);

        if (Nota.id) {
            axiosClient.put(`/nota/${Nota.id}`, updateData)
                .then(() => {
                    navigate('/dashboard/notapage');
                })
                .catch(err => {
                    console.error('An error occurred:', err);
                });
        } else {
            axiosClient.post(`/nota/`, updateData)
                .then(() => {
                    navigate('/dashboard/notapage');
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
                    <h1 className="text-center">{Nota.id ? `Update Nota` : 'Create Nota'}</h1>
                    <form onSubmit={onSubmit} className="text-center">
                        <div className="mb-3">
                        <select 
                                className="form-control"
                                value={Nota.user_id} 
                                onChange={ev => setNota({ ...Nota, user_id: ev.target.value })} 
                                required
                            >
                                <option value="" disabled>Studenti</option>
                                {students.map((students) => (
                                    <option key={students.id} value={students.id}>
                                     {students.Emri} : {students.id}
                                    </option>
                                    ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select 
                                className="form-control"
                                value={Nota.Nota} 
                                onChange={ev => setNota({ ...Nota, Nota: ev.target.value })} 
                                required
                            >
                                <option value="" disabled>Nota</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
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
