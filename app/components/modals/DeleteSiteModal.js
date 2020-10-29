import React, { useState } from 'react'
import Modal from 'react-modal'
import apiUtils from '../../utils/apiUtils'
import { styles } from './modals'

const DeleteSiteModal = (props) => {
    const [confirm, setConfirm] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    Modal.setAppElement('#app')

    const deleteSite = async () => {
        const deleteSiteResult = await apiUtils.deleteSite(props.token)
        if (deleteSiteResult.error) {
            return setError(deleteSiteResult.error.toString())
        }
        setMessage(`Site /${props.site} has been deleted successfully`)
        setTimeout(() => {
            props.logout()
        }, 3000)
    }

    return (
        <Modal
            isOpen={props.visible}
            onRequestClose={props.close}
            style={styles}
            contentLabel="Confirm Delete Site"
        >
            {
                message ? <div style={styles.container}>{message}</div> :
                    <div style={styles.container}>
                        <div>
                            Are you sure you want to delete site /{props.site} and all its contents?
                            This action can not be undone. To confirm you really want to proceed, enter the name of the site
                        </div>
                        <input type="text" value={confirm} onChange={(event) => setConfirm(event.target.value)} />

                        <div style={styles.buttonRow}>
                            <button onClick={deleteSite} disabled={confirm !== props.site}>Delete Site</button>
                            <button onClick={props.close}>Cancel</button>
                        </div>

                        {error && <div className="error">{error}</div>}
                        {message}

                    </div>
            }
        </Modal>
    )
}

export default DeleteSiteModal