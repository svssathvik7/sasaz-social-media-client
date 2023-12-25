import React, { useState, useContext,useEffect } from 'react';
import axios from 'axios';
import './Search.css';
import { userContextProvider } from '../Contexts/UserContext';

const SearchUser = (props) => {
    const { data } = props;
    const { user } = useContext(userContextProvider);
    const [frnd, setFrnd] = useState("Add Friend");
    const addFriend = async (e) => {
        if (frnd === "Add Friend"){
            e.preventDefault();
                try {
                    if (data && data.email) {
                        const response = await axios.post('http://localhost:5001/api/user/addfrnds', {
                            pId: props.data._id,
                            email:user.email,
                            frndEmail: data.email
                        });
            
                        console.log(response.data);
            
                        if (response.data && response.data.status) {
                            setFrnd("Remove Friend");
                        }
                    } 
                } catch (error) {
                    console.log(error);
                }
        }
        else{
            try {
                if (data && data.email) {
                    const response = await axios.post('http://localhost:5001/api/user/removefrnds', {
                        pId: props.data._id,
                        email : user.email
                    });
        
                    console.log(response.data);
        
                    if (response.data && response.data.status) {
                        setFrnd("Add Friend");
                    }
                } 
            } catch (error) {
                console.log(error);
            }
        }
    }
    

    return (
        <div className='single-user'>
            <img src={data.dp} alt="profile" />
            <h1>{data.name}</h1>
            <p>Posts: {data.posts.length}</p>
            <button onClick={addFriend}>{frnd}</button>
        </div>
    );
};

export default SearchUser;
