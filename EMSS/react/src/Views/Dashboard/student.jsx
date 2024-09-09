import { useEffect, useState } from "react"
import axiosClient from "../../axios-client";

export default function Student() {
   const [users, setUsers] = useState([]);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
    getUsers();
   }, [])

   const getUsers = () => {
    setLoading(true)
    axiosClient.get('/students')
    .then(({data}) => {
        setLoading(false)
        console.log(data);
    })
    .catch(() => {
        setLoading(false)
    })
   }
   
    return (
        <>

        </>
    )
}