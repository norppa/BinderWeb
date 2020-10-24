import React, { useEffect, useCallback, useState, useRef } from "react";

import './ContextMenu.css'

const ContextMenu = ({ container, visible, setVisible, actions }) => {
    // console.log('x', container, visible, setVisible, actions )
    const [xPos, setXPos] = useState("0px")
    const [yPos, setYPos] = useState("0px")
    const [targetId, setTargetId] = useState('')
    const [targetExists, setTargetExists] = useState(false)

    const handleContextMenu = useCallback((event) => {
        if (container.current.contains(event.target)) {
            event.preventDefault()

            const target = event.target.closest('.Folder, .File')
            if (target) {
                setTargetId(target.id)
                setTargetExists(true)
            } else {
                setTargetId(false)
                setTargetExists(false)
            }

            setXPos(`${event.pageX}px`)
            setYPos(`${event.pageY}px`)
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [])

    const handleClick = (event) => {
        setVisible(false)
    }

    useEffect(() => {
        document.addEventListener("click", handleClick);
        document.addEventListener("contextmenu", handleContextMenu);
        return () => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    })

    if (visible) {
        return (
            <ul className="menu" style={{ top: yPos, left: xPos }}>
                {
                    targetExists
                        ? <>
                            <li>Rename</li>
                            <li>Delete</li>
                        </>
                        : <>
                            <li>New File</li>
                            <li>New Folder</li>
                        </>
                }

            </ul>
        );
    }
    return null;
};

export default ContextMenu;