import React from 'react'

const AuthenticationUtilityForm = (props) => {
    return (
        <div id='authentication-utility-main'>
            <h1>{props.heading}</h1>
            <form name={props.type} onSubmit={props.Authenticate}>
                {props.type === 'Register' && <input name='name' type="text" onChange={props.changeInput} required placeholder='Enter Your Name' />}
                <input name='email' type="email" onChange={props.changeInput} required placeholder='Enter Your Email' />
                <input name='password' type="password" onChange={props.changeInput} required placeholder='Enter Your Password' />
                {props.type === 'Register' && <input name='phNumber' type="number" onChange={props.changeInput} required placeholder='Enter Your Number' />}
                <button type='submit'>{props.type}</button>
            </form>
            <p>Already {props.changeMessage} <button onClick={props.changePath}>Change</button></p>
        </div>
    )
}

export default AuthenticationUtilityForm