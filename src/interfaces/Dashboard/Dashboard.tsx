import React from "react";
import Header from "../../components/Header/Header";
import Board from "./Board/Board";
import Modal from "../../components/Modal/Modal";
import DisplaySidebar from "../../components/Sidebar/DisplaySidebar";
import "./Dashboard.scss";

function Dashboard() {
	return (
		<div className="dashboard">
			<DisplaySidebar />
			<Header />
			<Board />
			<Modal />
		</div>
	);
}

export default Dashboard;
