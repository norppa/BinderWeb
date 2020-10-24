import React from 'react'
import { TiFolder, TiFolderOpen, TiDocumentText, TiEdit, TiDelete, TiDocumentAdd, TiFolderAdd, TiUpload } from 'react-icons/ti'
import './Tree.css'

const Tree = (props) => {
    const parent = props.parent || null
    const children = props.contents
        .filter(item => item.parent === parent)
        .sort((a, b) => a.folder ? -1 : 1)

    return (
        <div className="Tree">
            {children.map(item => {
                if (item.folder) {
                    return (
                        <div key={item.id} className="Folder" id={item.id}>
                            <span className="nameRow" onClick={props.toggle.bind(this, item.id)}>
                                {item.open ? <TiFolderOpen /> : <TiFolder />}
                                {item.name}
                            </span>
                            {
                                item.open &&
                                <Tree contents={props.contents} 
                                    parent={item.id} 
                                    toggle={props.toggle} 
                                    select={props.select} />
                            }

                        </div>
                    )
                } else {
                    return (
                        <div key={item.id} className="File nameRow" id={item.id} onClick={props.select.bind(this, item.id)}>
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