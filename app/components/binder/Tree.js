import React, { useState } from 'react'
import { TiFolder, TiFolderOpen, TiDocumentText, TiEdit, TiDelete, TiDocumentAdd, TiFolderAdd, TiUpload } from 'react-icons/ti'
import './Tree.css'

const RenameInput = (props) => {

    const [renameText, setRenameText] = useState(props.name)

    return (
        <form onSubmit={props.actions.submitRename.bind(this, renameText)}>
            <input type="text"
                value={renameText}
                onChange={(event) => setRenameText(event.target.value)}
                onBlur={props.actions.cancelRename}
                autoFocus={true} />
        </form>
    )
}

const Tree = (props) => {
    const parent = props.parent || null
    const children = props.fileList
        .filter(item => !item.remove && item.parent === parent)
        .sort((a, b) => a.folder ? -1 : 1)

    return (
        <div className="Tree">
            {children.map(item => {

                const classNames = 'nameRow'
                    + (item.id === props.open ? ' open' : '')
                    + (item.id === props.selected ? ' selected' : '')
                const icon = item.folder ? (open ? <TiFolderOpen /> : <TiFolder />) : <TiDocumentText />

                return (
                    <div key={item.id} className={item.folder ? 'Folder' : 'File'} id={item.id}>
                        <span className={classNames} onClick={props.actions.select.bind(this, item.id)}>
                            {icon}
                            {props.rename === item.id
                                ? <RenameInput name={item.name} actions={props.actions} />
                                : item.name}
                        </span>
                        {
                            item.open &&
                            <Tree fileList={props.fileList}
                                parent={item.id}
                                open={props.open}
                                selected={props.selected}
                                rename={props.rename}
                                actions={props.actions} />
                        }

                    </div>
                )
            })}

        </div>
    )
}

export default Tree