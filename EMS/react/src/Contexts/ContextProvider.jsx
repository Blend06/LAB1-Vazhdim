// src/context/context.js
import React, { createContext, useContext, useState, useCallback } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN') || null);

    const setToken = useCallback((newToken) => {
        try {
            if (newToken) {
                localStorage.setItem('ACCESS_TOKEN', newToken);
            } else {
                localStorage.removeItem('ACCESS_TOKEN');
            }
            _setToken(newToken);
        } catch (error) {
            console.error("Error setting token:", error);
        }
    }, [_setToken]);

    return (
        <StateContext.Provider value={{ user, token, setUser, setToken }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);