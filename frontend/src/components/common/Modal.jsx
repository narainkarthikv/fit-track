import PropTypes from 'prop-types';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';

const Modal = ({ show, handleClose, title, children }) => (
  <BootstrapModal show={show} onHide={handleClose}>
    <BootstrapModal.Header closeButton>
      <BootstrapModal.Title>{title}</BootstrapModal.Title>
    </BootstrapModal.Header>
    <BootstrapModal.Body>{children}</BootstrapModal.Body>
    <BootstrapModal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </BootstrapModal.Footer>
  </BootstrapModal>
);
Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.node,
  children: PropTypes.node,
};

export default Modal;
