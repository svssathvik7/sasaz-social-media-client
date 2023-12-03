import React, { useState } from 'react'

const ProfileEdit = () => {
    const [change, setChange] = useState({
        name: true,
        email: true,
        password: true,
        newPassword: true,
        randomData: true,
        randomData2: true,
        randomData3: true,
    });
    const changeVisibility = (e) => {
        const { name } = e.target;
        setChange(() => {
            return {
                name: true,
                email: true,
                password: true,
                newPassword: true,
                randomData: true,
                randomData2: true,
                randomData3: true,
                [name]: false
            }
        })
    }
    return (
        <div id='profile-edit-main'>
            <div>
                {!change.name ? <input type="text" placeholder='There will be some text here...' /> : <h3>Here goes your name</h3>}
                <button name='name' onClick={changeVisibility}>Edit</button>
            </div>
            <div>
                {!change.email ? <input type="text" placeholder='There will be some text here...' /> : <h3>Here goes your email</h3>}
                <button name='email' onClick={changeVisibility}>Edit</button>
            </div>
            <div>
                {!change.password ? <input type="text" placeholder='There will be some text here...' /> : <h3>Here goes your Password</h3>}
                <button name='password' onClick={changeVisibility}>Edit</button>
            </div>
            <div>
                {!change.randomData ? <input type="text" placeholder='There will be some text here...' /> : <h3>Here goes your random data</h3>}
                <button name='randomData' onClick={changeVisibility}>Edit</button>
            </div>
            <div>
                {!change.randomData2 ? <input type="text" placeholder='There will be some text here...' /> : <h3>Here goes your random data</h3>}
                <button name='randomData2' onClick={changeVisibility}>Edit</button>
            </div>
            <div>
                {!change.randomData3 ? <input type="text" placeholder='There will be some text here...' /> : <h3>Here goes your random data</h3>}
                <button name='randomData3' onClick={changeVisibility}>Edit</button>
            </div>
        </div>
    )
}

export default ProfileEdit;