import './Modal.css';
import { Component } from 'react';

export default class Modal extends Component {
  handleOverlayClick = (e) => {
    if (e.target.classList.contains('Overlay')) {
      this.props.onClose();
    }
  };

  render() {
    const { modalImg } = this.props;
    return (
      <div
        className="Overlay"
        style={modalImg ? { display: 'flex' } : { display: 'none' }}
        onClick={this.handleOverlayClick}
      >
        <div className="Modal">{modalImg && <img src={modalImg} alt="" />}</div>
      </div>
    );
  }
}
