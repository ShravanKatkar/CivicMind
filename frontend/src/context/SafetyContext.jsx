import React, { createContext, useContext, useState } from 'react';

const SafetyContext = createContext();

export const useSafety = () => useContext(SafetyContext);

export const SafetyProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: 1,
        name: 'Rajesh Kumar',
        role: 'Field Worker',
        location: { lat: 19.0760, lng: 72.8777 } // Mumbai
    });

    const [alerts, setAlerts] = useState([]);
    const [currentSite, setCurrentSite] = useState(null);

    const addAlert = (alert) => {
        setAlerts((prev) => [alert, ...prev]);
    };

    const value = {
        user,
        setUser,
        alerts,
        addAlert,
        currentSite,
        setCurrentSite
    };

    return (
        <SafetyContext.Provider value={value}>
            {children}
        </SafetyContext.Provider>
    );
};
