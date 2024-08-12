import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { ContextProvider } from './Contexts/ContextProvider.jsx';


function App() {

  return (
    <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>
  )
}

export default App
