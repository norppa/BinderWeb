import React from 'react'

import './Menu.css'

const Menu = (props) => {
    if (!props.visible) return null

    return (
        <div className="Menu">
            <div className="item" onClick={props.actions.logout}>Log Out</div>
            <div>Change Password</div>
            <div>Delete Site</div>
        </div>
    )
}

export default Menu;