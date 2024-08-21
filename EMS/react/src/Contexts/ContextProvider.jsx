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
                console.log("Token set in localStorage:", newToken);
            } else {
                localStorage.removeItem('ACCESS_TOKEN');
                console.log("Token removed from localStorage");
            }
            _setToken(newToken);
            console.log("Token state updated:", newToken);
        } catch (error) {
            console.error("Error setting token:", error);
        }
    }, []);

    return (
        <StateContext.Provider value={{ user, token, setUser, setToken }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);