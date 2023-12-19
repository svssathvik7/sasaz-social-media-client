import axios from 'axios';
import React, { createContext, useState } from 'react'

export const TotalUserContextProvider = React.createContext(null);
const TotalUsersContext = ({ children }) => {
    const [users, setUsers] = useState();
    const getUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5001/api/user/allUsers");
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <TotalUserContextProvider.Provider value={{ users, getUsers }} >
            {children}
        </TotalUserContextProvider.Provider>
    )
}

export default TotalUsersContext