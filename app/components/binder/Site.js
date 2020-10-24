import React, { useEffect, useState, useRef } from 'react'
import ContextMenu from './ContextMenu'
import Tree from './Tree'
import apiUtils from '../../utils/apiUtils'
import './Site.css'

const Site = (props) => {
    // for ContextMenu event listeners
    const [fileList, setFileList] = useState([])
    const [selected, setSelected] = useState(false)
    const [rename, setRename] = useState(false)
    const [open, setOpen] = useState(false)
    const [text, setText] = useState('')
    const [modified, setModified] = useState(false)
    const [contextMenuVisible, setContextMenuVisible] = useState(false)

    const navigationRef = useRef(null)

    useEffect(() => {
        const asyncWrapper = async () => {
            const fileList = await apiUtils.getFiles(props.token)
            if (fileList.error) {
                if (fileList.error.status === 401) {
                    props.logout()
                }
            }
            setFileList(fileList)
        }
        asyncWrapper()
    }, [])

    

    const save = async () => {
        const data = fileList
            .map(item => item.id === selected ? { ...item, contents: text, update: true } : item)
            .filter(item => item.update || item.create || item.remove)

        await apiUtils.save(data, props.token)
    }

    const treeActions = {
        select: async (id) => {
            const selectedFile = fileList.find(item => item.id === id)
            if (selectedFile.folder) {
                setFileList(fileList.map(item => item.id === id ? { ...item, open: !item.open } : item))
            } else {
                if (modified) {
                    setFileList(fileList.map(item => item.id === open ? { ...item, contents: text, update: true } : item))
                }
                const selectedFileContents = selectedFile.contents || await apiUtils.getFileContents(props.token, id)
                setText(selectedFileContents)
                setModified(false)
                setOpen(id)
            }
        },
        cancelRename: () => {
            setSelected(false)
            setRename(false)
        },
        submitRename: (name) => {
            setFileList(fileList.map(file => file.id === rename ? { ...file, name, update: true } : file))
            setRename(false)
        }
    }

    const menuActions = {
        select: (id) => {
            console.log('selecting', id)
            setSelected(id)
        },
        rename: (id) => {
            setSelected(false)
            setRename(Number(id))
        }
    }

    const handleTextChange = (event) => {
        setText(event.target.value)
        setModified(true)
    }

    const openContextMenu = (value, targetId) => {
        if (value) {
            setContextMenuVisible(true)
            if (targetId) {
                setSelected(Number(targetId))
            } else {
                setSelected(false)
            }
        } else {
            setContextMenuVisible(false)
            setSelected(false)
        }
    }

    return (
        <div className="Site">
            <div className="header">
                <button onClick={save}>Save</button>
                <button onClick={props.logout}>Logout</button>
            </div>
            <div className="navigation" ref={navigationRef}>
                <Tree fileList={fileList}
                    open={open}
                    selected={selected}
                    rename={rename}
                    actions={treeActions} />
            </div>
            <div className="editor">
                <textarea value={text} onChange={handleTextChange} />
            </div>

            <ContextMenu
                container={navigationRef}
                visible={contextMenuVisible}
                openContextMenu={openContextMenu}
                actions={menuActions}
                fileList={fileList} />

        </div>
    )
}

export default Site