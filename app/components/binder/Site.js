import React, { useEffect, useState } from 'react'
import Tree from './Tree'
import apiUtils from '../../utils/apiUtils'
import './Site.css'

const Site = (props) => {
    const [contents, setContents] = useState([])
    const [selected, setSelected] = useState(false)
    const [text, setText] = useState('')

    useEffect(() => {
        const asyncWrapper = async () => {
            const contents = await apiUtils.getFiles(props.token)
            setContents(contents)
        }
        asyncWrapper()
    }, [])

    const toggle = (id) => {
        setContents(contents.map(item => item.id === id ? { ...item, open: !item.open } : item))
    }

    const select = async (id) => {
        const selectedFile = contents.find(item => item.id === id)
        const selectedFileContents = selectedFile.contents || await apiUtils.getFileContents(props.token, id)
        setContents(contents.map(item => item.id === selected ? { ...item, contents: text, update: true } : item))
        setSelected(id)
        setText(selectedFileContents)
    }

    const save = async () => {
        const data = contents
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
            <div className="navigation">
                <Tree contents={contents} toggle={toggle} select={select} />
            </div>
            <div className="editor">
                <textarea value={text} onChange={(event) => setText(event.target.value)} />
            </div>

        </div>
    )
}

export default Site