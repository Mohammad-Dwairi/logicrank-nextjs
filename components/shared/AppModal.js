import Modal from 'react-modal';
import classes from './styles.module.scss';
import {FaWindowClose} from "react-icons/fa";

const AppModal = props => {

    Modal.setAppElement('body');
    const {onRequestClose} = props;
    return (
        <Modal {...props} className={classes.centered} overlayClassName={classes.modalOverlay}>
            <FaWindowClose onClick={onRequestClose} className={classes.modalCloseIcon}/>
            {props.children}
        </Modal>
    );
};

export default AppModal;