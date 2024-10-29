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
import Drejtori from "./Views/Dashboard/drejtori";
import DrejtoriForm from './Views/Dashboard/DrejtoriForm'; 
import Profesori from "./Views/Dashboard/profesori";
import ProfesoriForm from "./Views/Dashboard/ProfesoriForm";
import Lenda from "./Views/Dashboard/lenda";
import LendaForm from "./Views/Dashboard/LendaForm";
import Orari from "./Views/Dashboard/orari";
import OrariForm from "./Views/Dashboard/OrariForm";
import Orariim from "./Views/Dashboard/orariim";
import Ligjerata from "./Views/Dashboard/ligjerata";
import ZgjedhVitin from "./Views/Dashboard/zgjedhvitin";





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
              },
              {
                path: 'drejtori',
                element: <Drejtori/>
              },
              {
                path: 'drejtori/new',
                element: <DrejtoriForm key="userCreate"/>
              },
              {
                path: 'drejtori/:id',
                element: <DrejtoriForm key="userUpdate"/>
              },
              {
                path: 'profesori',
                element: <Profesori/>
              },
              {
                path: 'profesori/new',
                element: <ProfesoriForm key="userCreate"/>
              },
              {
                path: 'profesori/:id',
                element: <ProfesoriForm key="userUpdate"/>
              },
              {
                path: 'lenda',
                element: <Lenda/>
            },
            {
                path: 'lenda/new',
                element: <LendaForm key="lendaCreate"/>
              },
              {
                path: 'lenda/:id',
                element: <LendaForm key="lendaUpdate"/>
              },
              {
                path: 'orari',
                element: <Orari/>
            },
            {
                path: 'orari/new',
                element: <OrariForm key="orariCreate"/>
              },
              {
                path: 'orari/:id',
                element: <OrariForm key="orariUpdate"/>
              },
              {
                path: 'orariim/',
                element: <Orariim/>
              },
              {
                path: 'ligjerata/',
                element: <Ligjerata/>
              },
              {
                path: 'zgjedhvitin/',
                element: <ZgjedhVitin/>
              }
        ]
    },
    {
        path: '/aboutus',
        element: <Aboutus/>
    }
])

export default router;