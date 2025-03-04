import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface DeleteModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: (id: string) => void;
  id: string;
}

const DeleteModal = ({
  showModal,
  setShowModal,
  handleDelete,
  id
}: DeleteModalProps) => {
  console.log('modal_id', id)
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header>
        <Modal.Title>Really delete?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button
          style={{ background: 'black' }}
          onClick={() => setShowModal(false)}
        >
          Cancel
        </Button>
        <Button
          style={{ background: 'firebrick' }}
          onClick={() => handleDelete(id)}
          className="d-flex gap-2"
        >
          <div>Delete</div>
          <i className="bi bi-trash3"></i>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
