// src/context/context.js
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

const StateContext = createContext({
    user: {},
    token: null,
    setUser: () => {},
    setToken: () => {}
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN") || null);

    useEffect(() => {
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    }, [token]);

    

    return (
        <StateContext.Provider value={{ user, token, setUser, setToken }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);