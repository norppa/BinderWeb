import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import apiUtils from '../../utils/apiUtils'
import './Binder.css'

import Site from './Site'

const Loading = (props) => {
    return (
        <div className="Loading">
            <h1>Loading {props.site}...</h1>
        </div>
    )
}

const Login = (props) => {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const submit = async (event) => {
        console.log('submit', props.site, password)
        event.preventDefault()
        const loginResult = await apiUtils.login(props.site, password)
        if (loginResult.error) {
            return setError('Incorrect password')
        }
        if (loginResult.token) {
            return props.login(loginResult.token)
        }

        setError('Mysterious error!')
    }

    return (
        <div className="Login">
            <h1>Log in to /{props.site}</h1>
            <form onSubmit={submit}>
                <input type="password" value={password} onChange={(evt) => setPassword(evt.target.value)} />
            </form>

            {error && <div className="error">{error}</div>}

        </div>
    )
}

const Register = (props) => {
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState('')
    const history = useHistory()

    const submit = async (event) => {
        if (password !== confirm) {
            return setError('Passwords do not match')
        }
        const registerResult = await apiUtils.register(props.site, password)
        if (registerResult.token) {
            return props.login(registerResult.token)
        }

        setError('There was an error trying to register this site')
    }

    const cancel = () => {
        history.push('/')
    }

    return (
        <div className="Register">
            <h1>Create site /{props.site}</h1>
            <div className="passwordRow">
                Enter password:<input type="password" value={password} onChange={(evt) => setPassword(evt.target.value)} />
            </div>
            <div className="passwordRow">
                Confirm password:<input type="password" value={confirm} onChange={(evt) => setConfirm(evt.target.value)} />
            </div>
            <div className="buttonRow">
                <button onClick={submit} disabled={password !== confirm || password === ''}>Create Site</button>
                <button onClick={cancel}>Cancel</button>
            </div>



            {error && <div className="error">{error}</div>}

        </div>
    )
}

const Error = (props) => {
    return (
        <div className="Error">There was a mysterious error. This should not happen...</div>
    )
}

const Binder = (props) => {
    const site = props.match.params.site
    const [token, setToken] = useState(false)
    const [view, setView] = useState('loading')
    const history = useHistory()
    const TOKEN_KEY = '@BinderToken:' + site

    useEffect(() => {
        initialize()
    }, [])

    const initialize = async () => {
        const siteExists = await apiUtils.checkIfSiteExists(site)
        if (siteExists) {
            const token = localStorage.getItem(TOKEN_KEY)
            if (token) {
                setToken(token)
                setView('site')
            } else {
                setView('login')
            }
        } else {
            setView('create')
        }
    }

    const login = async (token) => {
        localStorage.setItem(TOKEN_KEY, token)
        setToken(token)
        setView('site')
    }

    const logout = () => {
        console.log('logout')
        localStorage.removeItem(TOKEN_KEY)
        setToken(false)
        history.push('/')
    }

    const updateToken = (newToken) => {
        localStorage.setItem(TOKEN_KEY, newToken)
        setToken(newToken)
    }

    switch (view) {
        case 'loading': return <Loading site={site} />
        case 'create': return <Register site={site} login={login} />
        case 'login': return <Login site={site} login={login} />
        case 'site': return <Site
            site={site}
            token={token}
            updateToken={updateToken}
            logout={logout}/>
        default: return <Error />
    }
}

export default Binder