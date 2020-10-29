import ChangePasswordModal from './ChangePasswordModal'
import DeleteFileModal from './DeleteFileModal'
import DeleteSiteModal from './DeleteSiteModal'

export default {
    changePassword: ChangePasswordModal,
    deleteSite: DeleteSiteModal,
    deleteFile: DeleteFileModal,
}

export const styles = {
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