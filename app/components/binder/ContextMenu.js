import React, { useEffect, useCallback, useState, useRef } from "react";

import './ContextMenu.css'

const ContextMenu = ({ container, visible, openContextMenu, actions }) => {
    const [xPos, setXPos] = useState("0px")
    const [yPos, setYPos] = useState("0px")
    const [targetId, setTargetId] = useState('')
    const [targetType, setTargetType] = useState(false)

    const handleContextMenu = useCallback((event) => {
        if (container.current.contains(event.target)) {
            event.preventDefault()

            let foundTargetId, foundTargetType
            const target = event.target.closest('.File, .Folder')
            if (target) {
                if (target.classList.contains('File')) {
                    foundTargetId = Number(target.id)
                    foundTargetType = 'file'
                } else {
                    foundTargetId = Number(target.id)
                    foundTargetType = 'folder'
                }
            } else {
                foundTargetId = false
                foundTargetType = 'none'
            }
            setXPos(`${event.pageX}px`)
            setYPos(`${event.pageY}px`)
            setTargetId(foundTargetId)
            setTargetType(foundTargetType)
            openContextMenu(true, foundTargetId)
        } else {
            openContextMenu(false)
        }
    }, [])

    const handleClick = (event) => {
        openContextMenu(false)
    }

    useEffect(() => {
        document.addEventListener("click", handleClick);
        document.addEventListener("contextmenu", handleContextMenu);
        return () => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    })

    const Content = () => {
        switch (targetType) {
            case 'file': return (
                <>
                    <li onClick={actions.rename.bind(this, targetId)}>Rename</li>
                    <li onClick={actions.delete.bind(this, targetId)}>Delete</li>
                </>
            )
            case 'folder': return (
                <>
                    <li onClick={actions.rename.bind(this, targetId)}>Rename</li>
                    <li onClick={actions.delete.bind(this, targetId)}>Delete</li>
                    <li>New File</li>
                    <li>New Folder</li>
                </>
            )
            default: return (
                <>
                    <li onClick={actions.create.bind(this, null, 'file')}>New File</li>
                    <li onClick={actions.create.bind(this, null, 'folder')}>New Folder</li>
                </>
            )
        }
    }

    if (visible) {
        return (
            <ul className="menu" style={{ top: yPos, left: xPos }}>
                <Content />
            </ul>
        );
    }
    return null;
};

export default ContextMenu;