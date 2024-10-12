import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../../axios-client"

export default function StudentForm(){
    const {id} = useParams();
    const navigate = useNavigate();
    const[loading, setLoading] = useState(false)
    const[errors, setError] = useState(null)
    const[user, setUser] = useState({
        id: null,
        Emri: '',
        Mbiemri: '',
        email: '',
        password: '',
        password_confirmation: ''


    })
    if(id){
        useEffect(() =>{
            setLoading(true)
            axiosClient.get(`/student/${id}`)
            .then(({data}) =>{
                setLoading(false)
                setUser(data)
            })
            .catch(() =>{
                setLoading(false)
            })
        }, [])
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if(user.id){
            axiosClient.put(`/users/${user.id}`, user)
            .then(() =>{
                navigate('/users')        
        })
        .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
                console.log("Validation Errors:", response.data.errors);
                setError(response.data.errors);
            } else {
                console.error('An unexpected error occurred:', err);
                setError('An unexpected error occurred');
            }
            setLoading(false);
        })
    }else{
        axiosClient.post(`/users/`, user)
            .then(() =>{
                navigate('/users')        
        })
        .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
                console.log("Validation Errors:", response.data.errors);
                setError(response.data.errors);
            } else {
                console.error('An unexpected error occurred:', err);
                setError('An unexpected error occurred');
            }
            setLoading(false);
        })
    }

    return(
       <>
       {user.id && <h1>Update User: {user.name}</h1>}
       {!user.id &&  <h1>Create User</h1>}
       <div className="card animated fadeInDown">
        {loading &&  (<div className="text-center">Loading...</div>)}
        {errors && <div className="alert">
            {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
            ))}
        </div> }

        {!loading && 
            <form onSubmit={onSubmit}>
                <input value={user.Emri} onChange={ev => setUser({...user, Emri: ev.target.value})} placeholder="Emri"/>
                <input value={user.Mbiemri} onChange={ev => setUser({...user, Mbiemri: ev.target.value})} placeholder="Mbiemri"/>
                <input value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email"/>
                <input onChange={ev => setUser({...user, Password: ev.target.value})} placeholder="Password"/>
                <button className="btn">Save</button>
            </form>
        }
       </div>
       </>
    )
}
}