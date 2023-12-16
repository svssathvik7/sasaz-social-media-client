import React, { useState } from 'react'
import { userContextProvider } from './UserContext';
import { useContext } from 'react';
import axios from 'axios';
export const userPostsContext = React.createContext(null);
export default function UserPostContext ({children}){
    const {user} = useContext(userContextProvider);
    const [posts,setPosts] = useState([]);
    const getUserPosts = async ()=>{
        if(user!==null){
            const response = await axios.post("http://localhost:5001/api/user/getUserPosts",{email:user.email});
            if(response.data.posts===false){
                setPosts([]);
            }
            else{
                setPosts(response.data.posts);
            }
        }
        else{
            setPosts([]);
        }
    }
  return (
    <userPostsContext.Provider value={{getUserPosts,posts}}>
        {children}
    </userPostsContext.Provider>
  )
}
