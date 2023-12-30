import React, { useContext, useEffect, useRef, useState } from 'react'
import { TotalUserContextProvider } from '../Contexts/TotalUsersContext';
import './Search.css';
import SearchUser from './SearchUser';
import { userContextProvider } from '../Contexts/UserContext';
const Search = () => {
    const { getUsers, users } = useContext(TotalUserContextProvider);
    const { user } = useContext(userContextProvider);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [search, setSearch] = useState();
    useEffect(() => {
        getUsers();
    }, []);
    const searchUsers = (e) => {
        e.preventDefault();
        const filter = users && users.users.filter((user) => {
            const regex = new RegExp(search, 'i');
            return regex.test(user.name);
        });
        if (filter.length === 0) {
            setFilteredUsers(-1);
        }
        else {
            setFilteredUsers(filter);
        }
    }
    return (
        <div id='search-page'>
            <form onSubmit={searchUsers}>
                <input type="text" placeholder='Search Account' name='account' onChange={(e) => setSearch(e.target.value)} />
                <button type='submit'>Search</button>
            </form>
            <div id="search-results">
                {filteredUsers && filteredUsers.length === 0 ? users && users.users.map((ele, ind) => {
                    if (user && (ele.email !== user.email)) {
                        return <SearchUser key={ind} data={ele} />
                    }
                }) : filteredUsers && filteredUsers === -1 ? <p>No Such Users Found</p> : filteredUsers.map((ele, ind) => {
                    if (user && (ele.email !== user.email)) {
                        return <SearchUser key={ind} data={ele} />
                    }
                })}
            </div>
        </div>
    )
}

export default Search;