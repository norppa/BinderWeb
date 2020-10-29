import React, { useState } from 'react'
import Modal from 'react-modal'

import apiUtils from '../../utils/apiUtils'

const ChangePasswordModal = (props) => {
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState('')

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
        container: {
            display: 'flex',
            flexDirection: 'column'
        },
        buttonRow: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: '20px'
        }
    }
    Modal.setAppElement('#app')

    const changePassword = async () => {
        console.log('changing password')
        const changePasswordResult = await apiUtils.changePassword(password, props.token)
        console.log(changePasswordResult)
        if (changePasswordResult.error) {
            return setError(changePasswordResult.error)
        }
        props.updateToken(changePasswordResult.token)
        props.close()
    }

    return (
        <Modal
            isOpen={props.visible}
            // onAfterOpen={afterOpenModal}
            onRequestClose={props.close}
            style={customStyles}
            contentLabel="Change Password">

            <div style={customStyles.container}>
                Change password for site /{props.site}
                <div>
                    Enter new Password:
                    <input type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div>
                    Confirm new password:
                    <input type="password"
                        value={confirm}
                        onChange={(event) => setConfirm(event.target.value)} />
                </div>
                <div style={customStyles.buttonRow}>
                    <button onClick={changePassword} disabled={password === '' || password !== confirm}>Change Password</button>
                    <button onClick={props.close}>Cancel</button>
                </div>

            </div>


        </Modal>
    )
}

export default ChangePasswordModal