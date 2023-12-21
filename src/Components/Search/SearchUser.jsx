import React from 'react'
import './Search.css';
const SearchUser = (props) => {
    const { data } = props;
    return (
        <div className='single-user'>
            <img src={data.dp} alt="profile" />
            <h1>{data.name}</h1>
            <p>Posts : {data.posts.length}</p>
            <button>Add Friend</button>
        </div>
    )
}

export default SearchUser