import React from "react";
import "./Modal.scss";

interface ModalProps {
	children: React.ReactNode;
}

function Modal({ children }: ModalProps) {
	return <div className="modal-container">{children}</div>;
}

export default Modal;
