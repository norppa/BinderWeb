import React from 'react'
import Modal from 'react-modal'

const ConfirmDeleteModal = (props) => {

    const customStyles = {
        content: {
            top: '30%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#32394D',
            borderRadius: '10px',
            fontFamily: "Times New Roman",
            fontSize: '18px',
            color: '#D8E6F3',
        },
        buttonRow: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: '20px'
        }
    }
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
            style={customStyles}
            contentLabel="Confirm Delete File"
        >
            <div style={customStyles.container}>
                <span>Are you sure you want to delete {props.confirm.name}?</span>
                <br />
                <div style={customStyles.buttonRow}>
                    <button onClick={pressDelete}>Delete</button>
                    <button onClick={props.close}>Cancel</button>
                </div>

            </div>


        </Modal>
    )
}

export default ConfirmDeleteModal