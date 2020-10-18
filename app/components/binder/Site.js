import React from 'react'
import './Site.css'

const Site = (props) => {

    return (
        <div className="Site">
            <div className="header">
                <button onClick={props.logout}>Logout</button>
            </div>
            <div className="navigation">
navi
            </div>
            <div className="editor">
                <textarea />
            </div>

        </div>
    )
}

export default Site