import React from 'react'
import './Login.css'

const Login = (props) => {
    return (
        <div className="Login">
            Login to {props.params.site}
        </div>
    )
}

export default Login