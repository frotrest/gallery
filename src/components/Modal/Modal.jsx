import './Modal.css';

const Modal = ({ modalImg, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('Overlay')) {
      onClose();
    }
  };
  return (
    <div
      className="Overlay"
      style={modalImg ? { display: 'flex' } : { display: 'none' }}
      onClick={handleOverlayClick}
    >
      <div className="Modal">{modalImg && <img src={modalImg} alt="" />}</div>
    </div>
  );
};

export default Modal;
