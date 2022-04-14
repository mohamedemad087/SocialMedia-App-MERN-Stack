import React, { useRef } from 'react'
import useStyles from "./styles";


function Modal({imgSrc, setShowModal}) {
  const classes = useStyles();
  const modalRef = useRef();

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  }

  return (
    <div className={classes.root} ref={modalRef} onClick={closeModal}>

        <img className={classes.image} src={imgSrc} alt="Not found"/>
    </div>
  )
}

export default Modal
