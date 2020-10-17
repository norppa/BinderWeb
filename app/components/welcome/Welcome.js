import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './Welcome.css'

const Welcome = (props) => {
    const [site, setSite] = useState('')
    const history = useHistory()

    const submit = (event) => {
        event.preventDefault()
        history.push(`/${site}`)
    }
    return (
        <div className="SiteSelector">
            <h1>Welcome to Binder</h1>
            <p>Please select the site you wish to access or create</p>
            <form onSubmit={submit}>
                <input type="text"
                    value={site}
                    onChange={(event) => setSite(event.target.value)}
                    onSubmit={() => console.log(site)} />
            </form>

        </div>
    )
}

export default Welcome