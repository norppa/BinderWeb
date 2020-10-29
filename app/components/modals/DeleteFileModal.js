import React from 'react'
import Modal from 'react-modal'
import { styles } from './modals'

const DeleteFileModal = (props) => {
    Modal.setAppElement('#app')

    const pressDelete = () => {
        props.delete(props.confirm.id)
        props.close()
    }

    return (
        <Modal
            isOpen={!!props.confirm}
            // onAfterOpen={afterOpenModal}
            onRequestClose={props.close}
            style={styles}
            contentLabel="Confirm Delete File"
        >
            <div style={styles.container}>
                {props.confirm.folder
                    ? <span>Are you sure you want to delete folder "{props.confirm.name}" and all its contents?</span>
                    : <span>Are you sure you want to delete file "{props.confirm.name}"?</span>
                }
                <div style={styles.buttonRow}>
                    <button onClick={pressDelete}>Delete</button>
                    <button onClick={props.close}>Cancel</button>
                </div>

            </div>


        </Modal>
    )
}

export default DeleteFileModal