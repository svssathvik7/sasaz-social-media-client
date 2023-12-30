import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import './Search.css';
import { userContextProvider } from '../Contexts/UserContext';

const SearchUser = (props) => {
    const { data } = props;
    const { user, setUsers } = useContext(userContextProvider);
    const [frnd, setFrnd] = useState("Add Friend");
    const addFriend = async (e) => {
        e.preventDefault();
        try {
            if (data && data.email) {
                const response = await axios.post('http://localhost:5001/api/user/managefrnds', {
                    fId: props.data._id,
                    email: user.email
                });
                const d = response.data;
                if (d.status) {
                    if (frnd === 'Add Friend') {
                        setFrnd("Remove Friend");
                        setUsers((prevValue) => {
                            return { ...prevValue, friends: [...prevValue.friends, data] };
                        })
                    }
                    else {
                        setFrnd("Add Friend");
                        const removeFriends = user.friends.filter((ele) => ele.email !== data.email);
                        console.log(removeFriends);
                        setUsers((prevValue) => {
                            return { ...prevValue, friends: [removeFriends] }
                        });
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        var eitherFrnd = false;
        user && user.friends.map((ele, ind) => {
            if (ele.email === data.email) {
                eitherFrnd = true;
            }
        });
        if (eitherFrnd) {
            setFrnd("Remove Friend");
        }
        else {
            setFrnd("Add Friend");
        }
    }, [])

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
