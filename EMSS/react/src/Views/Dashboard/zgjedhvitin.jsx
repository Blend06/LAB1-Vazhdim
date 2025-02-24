import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useStateContext } from '../../Contexts/ContextProvider.jsx';

export default function ZgjedhVitin() {
    const navigate = useNavigate();
    const { user , setUser } = useStateContext(); 
    const [viti, setViti] = useState(""); 

    

    const onSubmit = async (ev) => {
        ev.preventDefault();
    
        const updateData = {
            Emri: user.Emri,
            Mbiemri: user.Mbiemri,
            email: user.email,
            Roli: 'Student',
            Viti: viti
        };
    
        axiosClient.put(`/students/${user.id}`, updateData)
            .then((response) => {
                // Update user in context to reflect changes in Profile
                setUser(prevUser => ({ ...prevUser, Viti: viti }));
                navigate('/dashboard/profile');
            })
            .catch(err => {
                console.error('An error occurred:', err);
            });
    };

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
            <div className="card animated FadeInDown" style={{ width: '400px' }}>
                <div className="card-body">
                    <h1 className="text-center">Përzgjedh Vitin</h1>
                    <form onSubmit={onSubmit} className="text-center">
                        <div className="form-group">
                            <select
                                id="viti"
                                className="form-control"
                                value={viti}
                                onChange={(e) => setViti(e.target.value)}
                                required
                            >
                                <option value="">Zgjidh Viti</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                        <button className="btn btn-primary w-100 mt-3">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
