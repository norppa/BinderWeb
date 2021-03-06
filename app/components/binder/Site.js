import React, { useEffect, useState, useRef } from 'react'
import Mousetrap from 'mousetrap'
import { TiFolder, TiThMenuOutline, TiThMenu, TiUpload } from 'react-icons/ti'

import Menu from './Menu'
import ContextMenu from './ContextMenu'
import Modals from '../modals/modals'
import Tree from './Tree'
import apiUtils from '../../utils/apiUtils'
import './Site.css'

const Site = (props) => {
    const [fileList, setFileList] = useState([])
    const [selected, setSelected] = useState(false)
    const [rename, setRename] = useState(false)
    const [open, setOpen] = useState(false)
    const [text, setText] = useState('')
    const [textModified, setTextModified] = useState(false)
    const [contextMenuVisible, setContextMenuVisible] = useState(false)
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false)
    const [changePasswordModal, setChangePasswordModal] = useState(false)
    const [deleteSiteModal, setDeleteSiteModal] = useState(false)
    const [menuVisible, setMenuVisible] = useState(false)

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

    Mousetrap.bind('ctrl+s', (event) => {
        event.preventDefault()
        save()
    })

    const save = async () => {
        let newFileList = fileList.map(item => item.id == open ? { ...item, contents: text, update: true } : item)
        const data = newFileList.filter(item => item.update || item.create || item.remove)

        const result = await apiUtils.save(data, props.token)
        if (result.error) {
            return console.error('something went horribly wrong', result.error)
        }

        const resultDataToSave = result
            .filter(file => !file.remove)
            .map(file => {
                const { id, name, folder, parent, contents } = file
                return { id, name, folder, parent, contents }
            })
        // remove modified
        newFileList = newFileList
            .filter(file => !(file.remove || file.create || file.update))
            .concat(resultDataToSave)
        setFileList(newFileList)
        setTextModified(false)
    }

    const markForDeletion = (id) => {
        const recursiveMarkForDeletion = (id, fileList) => {
            const fileObj = fileList.find(file => file.id == id)
            let newFileList = fileList.map(file => file.id == id ? { ...file, remove: true } : file)
            if (fileObj.folder) {
                newFileList
                    .filter(file => file.parent == id)
                    .forEach(child => {
                        newFileList = recursiveMarkForDeletion(child.id, newFileList)
                    })
            }
            return newFileList
        }
        setFileList(recursiveMarkForDeletion(id, fileList))
        if (open == id) {
            setOpen(false)
            setText('')
        }
        if (selected === id) setSelected(false)
    }

    const treeActions = {
        select: async (id) => {
            const selectedFile = fileList.find(item => item.id == id)
            if (selectedFile.folder) {
                setFileList(fileList.map(item => item.id == id ? { ...item, open: !item.open } : item))
            } else {
                if (textModified) {
                    setFileList(fileList.map(item => item.id == open ? { ...item, contents: text, update: true } : item))
                }
                const selectedFileContents = selectedFile.contents !== undefined
                    ? selectedFile.contents
                    : await apiUtils.getFileContents(props.token, id)
                setText(selectedFileContents)
                setTextModified(false)
                setOpen(id)
            }
        },
        cancelRename: () => {
            setSelected(false)
            setRename(false)
        },
        submitRename: (name) => {
            setFileList(fileList.map(file => file.id == rename ? { ...file, name, update: true } : file))
            setRename(false)
        }
    }

    const contextMenuActions = {
        setMenuOpen: (value, targetId) => {
            if (value) {
                setContextMenuVisible(true)
                if (targetId) {
                    setSelected(targetId)
                } else {
                    setSelected(false)
                }
            } else {
                setContextMenuVisible(false)
                setSelected(false)
            }
        },
        select: (id) => {
            setSelected(id)
        },
        rename: (id) => {
            setSelected(false)
            setRename(id)
        },
        delete: (id) => {
            setConfirmDeleteModal(fileList.find(file => file.id == id))
            setContextMenuVisible(false)
            setSelected(false)
        },
        create: (parent, type) => {
            const id = 'new_' + fileList.reduce((acc, cur) => cur.id.toString().includes('new') ? acc + 1 : acc, 0)
            const name = 'new_file_' + (fileList.filter(file => file.parent === parent && file.name.includes('new_file_')).length + 1)
            const newFile = {
                id,
                name,
                parent,
                folder: type !== 'file',
                contents: type === 'file' ? '' : null,
                create: true
            }
            let newFileList = fileList.concat(newFile)
            if (parent) newFileList = newFileList.map(file => file.id == parent ? { ...file, open: true } : file)
            setFileList(newFileList)
            setRename(id)
        }
    }

    const menuActions = {
        logout: props.logout,
        changePassword: () => setChangePasswordModal(true),
        deleteSite: () => setDeleteSiteModal(true),
        debug: () => console.log(fileList)
    }

    const handleTextChange = (event) => {
        setText(event.target.value)
        setTextModified(true)
    }

    return (
        <div className="Site">
            <div className="navigation" ref={navigationRef}>
                <div className="navigationButtonRow">
                    <div>
                        <TiThMenu className="button" onClick={setMenuVisible.bind(this, !menuVisible)} />
                        <Menu visible={menuVisible} actions={menuActions} />
                    </div>
                    {(textModified || fileList.some(file => file.update || file.create || file.remove))
                        && <TiUpload className="button" onClick={save} />}

                </div>
                <Tree fileList={fileList}
                    open={open}
                    selected={selected}
                    rename={rename}
                    actions={treeActions} />
            </div>
            <div className="editor">
                <textarea className="mousetrap" value={text} onChange={handleTextChange} disabled={!open} />
            </div>

            <ContextMenu
                container={navigationRef}
                visible={contextMenuVisible}
                actions={contextMenuActions}
                fileList={fileList} />

            <Modals.changePassword
                visible={changePasswordModal}
                close={setChangePasswordModal.bind(this, false)}
                site={props.site}
                token={props.token}
                updateToken={props.updateToken} />

            <Modals.deleteFile
                confirm={confirmDeleteModal}
                delete={markForDeletion}
                close={setConfirmDeleteModal.bind(this, false)} />

            <Modals.deleteSite
                visible={deleteSiteModal}
                close={setDeleteSiteModal.bind(this, false)}
                site={props.site}
                token={props.token}
                logout={props.logout} />

        </div>
    )
}

export default Site