import React, { useState } from 'react'
import { TiFolder, TiFolderOpen, TiDocumentText, TiEdit, TiDelete, TiDocumentAdd, TiFolderAdd, TiUpload } from 'react-icons/ti'
import './Tree.css'

const Tree = (props) => {
    const parent = props.parent || null
    const children = props.fileList
        .filter(item => item.parent === parent)
        .sort((a, b) => a.folder ? -1 : 1)

    return (
        <div className="Tree">
            {children.map(item => {
                const selectedClass = item.id === props.selected ? ' selected' : ''
                if (item.folder) {
                    return (
                        <div key={item.id} className="Folder" id={item.id}>
                            <span className={'nameRow' + selectedClass} onClick={props.select.bind(this, item.id)}>
                                {item.open ? <TiFolderOpen /> : <TiFolder />}
                                {item.name}
                            </span>
                            {
                                item.open &&
                                <Tree fileList={props.fileList}
                                    parent={item.id}
                                    select={props.select}
                                    selected={props.selected} />
                            }

                        </div>
                    )
                } else {
                    return (
                        <div key={item.id}
                            className={'File nameRow' + selectedClass}
                            id={item.id}
                            onClick={props.select.bind(this, item.id)}>
                            <TiDocumentText />
                            {item.name}
                        </div>
                    )
                }
            })}

        </div>
    )
}

export default Tree