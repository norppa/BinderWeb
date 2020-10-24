import React, { useEffect, useState, useRef } from 'react'
import ContextMenu from './ContextMenu'
import Tree from './Tree'
import apiUtils from '../../utils/apiUtils'
import './Site.css'

const Site = (props) => {
    const [fileList, setFileList] = useState([])
    const [selected, setSelected] = useState(false)
    const [text, setText] = useState('')
    const [contextMenuVisible, setContextMenuVisible] = useState(false)

    const navigationRef = useRef(null)

    useEffect(() => {
        console.log('site useEffect')
        const asyncWrapper = async () => {
            const fileList = await apiUtils.getFiles(props.token)
            console.log('fileList', fileList)
            if (fileList.error) {
                if (fileList.error.status === 401) {
                    props.logout()
                }
            }
            setFileList(fileList)
        }
        asyncWrapper()
    }, [])

    const select = async (id) => {
        const selectedFile = fileList.find(item => item.id === id)
        if (selectedFile.folder) {
            const newFileList = fileList.map(item => item.id === id ? { ...item, open: !item.open } : item)
            setFileList(newFileList)
        } else {
            const selectedFileContents = selectedFile.contents || await apiUtils.getFileContents(props.token, id)
            setFileList(fileList.map(item => item.id === selected ? { ...item, contents: text, update: true } : item))
            setText(selectedFileContents)
        }
        // sets edit to true on first load
        setSelected(id)
    }

    const save = async () => {
        const data = fileList
            .map(item => item.id === selected ? { ...item, contents: text, update: true } : item)
            .filter(item => item.update ||item.create || item.remove )

        await apiUtils.save(data, props.token)
    }

    return (
        <div className="Site">
            <div className="header">
                <button onClick={save}>Save</button>
                <button onClick={props.logout}>Logout</button>
            </div>
            <div className="navigation" ref={navigationRef}>
                <Tree fileList={fileList} select={select} selected={selected} />
            </div>
            <div className="editor">
                <textarea value={text} onChange={(event) => setText(event.target.value)} />
            </div>

            <ContextMenu
                container={navigationRef}
                visible={contextMenuVisible}
                setVisible={setContextMenuVisible}
                actions={props.actions} />

        </div>
    )
}

export default Site