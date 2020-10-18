import React from 'react'

const Site = (props) => {

    console.log('lll', props.logout, props.site)
    return (
        <div className="Site">
            Main site
            <button onClick={props.logout}>Logout</button>
        </div>
    )
}

export default Site