import React, { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN') || null);

    const setToken = (token) => {
        console.log("Setting token directly in localStorage:", token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
            console.log("Token stored directly in localStorage:", localStorage.getItem('ACCESS_TOKEN'));
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
            console.log("Token removed from localStorage");
        }
        _setToken(token);
    };

    return (
        <StateContext.Provider value={{ user, token, setUser, setToken }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
