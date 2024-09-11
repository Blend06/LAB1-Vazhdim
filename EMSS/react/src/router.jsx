import {createBrowserRouter} from "react-router-dom";
import Homepage from "./Views/Homepage/Homepage";
import Login from "./Views/Homepage/Login";
import Register from "./Views/Homepage/Register";
import Contact from "./Views/Homepage/Contact";
import Dashboard from "./Views/Dashboard/Dashboard";
import Aboutus from "./Views/Homepage/Aboutus";
import Profile from "./Views/Dashboard/profile";
import Student from './Views/Dashboard/student'; 
import StudentForm from './Views/Dashboard/StudentForm'; 



const router = createBrowserRouter([
    {
        path: '/',
        element: <Homepage/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/contact',
        element: <Contact/>
    },
    {
        path: '/dashboard',
        element: <Dashboard/>,
        children:[
            {
                path: 'profile',
                element: <Profile/>
            },
            {
                path: 'student',
                element: <Student/>
            },
            {
                path: 'student/new',
                element: <StudentForm key="userCreate"/>
              },
              {
                path: 'student/:id',
                element: <StudentForm key="userUpdate"/>
              }
        ]
    },
    {
        path: '/aboutus',
        element: <Aboutus/>
    }
])

export default router;