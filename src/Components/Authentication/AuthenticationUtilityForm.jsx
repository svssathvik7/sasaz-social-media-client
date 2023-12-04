import React from 'react'

const AuthenticationUtilityForm = (props) => {
    return (
        <div id='authentication-utility-main'>
            <h1>{props.heading}</h1>
            <form onSubmit={null}>
                <input type="email" required placeholder='Enter Your Email' />
                <input type="email" required placeholder='Enter Your Email' />
                <input type="email" required placeholder='Enter Your Email' />
                <input type="email" required placeholder='Enter Your Email' />
                <button type='submit'>{props.type}</button>
            </form>
            <p>Already {props.changeMessage} <button onClick={props.changePath}>Change</button></p>
        </div>
    )
}

export default AuthenticationUtilityForm