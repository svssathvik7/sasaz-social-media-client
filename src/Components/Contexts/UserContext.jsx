import React, { useEffect, useState } from 'react'
import axios from 'axios';
export const userContextProvider = React.createContext(null);
const UserContext = ({ children }) => {
    const [user, setUsers] = useState(null)
    const changeUserDetails = (e) => {
        const { name, value } = e.target;   
        setUsers((prevValue) => {
            return { ...prevValue, [name]: value }
        });
    }
    const getUserDetails = async () => {
        if (user === null) {
            const token = localStorage.getItem('token');
            const response = await axios.post("http://localhost:5001/api/user/getUserDetails", { token });
            const data = await response.data;
            setUsers({
                name: data.userDetails.name,
                email: data.userDetails.email,
                phNumber: data.userDetails.phNumber,
                posts: data.userDetails.posts,
                friends: data.userDetails.friends,
                dp: data.userDetails.dp
            });
        }
    }
    return (
        <userContextProvider.Provider value={{ user, setUsers, changeUserDetails, getUserDetails }}>
            {children}
        </userContextProvider.Provider>
    )
}

export default UserContext;