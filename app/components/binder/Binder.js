import React, { useState } from 'react'

const Binder = (props) => {
    const [token, setToken] = useState(false)

    return (
        <div className="Binder">Binder {props.match.params.site}</div>
    )
}

export default Binder