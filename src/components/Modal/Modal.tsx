import React from "react";
import "./Modal.scss";

function Modal({ children }: { children: React.ReactNode }) {
	return <div className="modal-container">{children}</div>;
}

export default Modal;
