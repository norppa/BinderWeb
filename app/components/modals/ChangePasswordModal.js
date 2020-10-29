import React, { useState } from 'react'
import Modal from 'react-modal'
import { styles } from './modals'

import apiUtils from '../../utils/apiUtils'

const ChangePasswordModal = (props) => {
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState('')

    Modal.setAppElement('#app')

    const changePassword = async () => {
        const changePasswordResult = await apiUtils.changePassword(password, props.token)
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
            style={styles}
            contentLabel="Change Password">

            <div style={styles.container}>
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
                <div style={styles.buttonRow}>
                    <button onClick={changePassword} disabled={password === '' || password !== confirm}>Change Password</button>
                    <button onClick={props.close}>Cancel</button>
                </div>

            </div>


        </Modal>
    )
}

export default ChangePasswordModal