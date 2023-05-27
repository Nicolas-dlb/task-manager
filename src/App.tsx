import { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeContext } from "./utils/providers/ThemeProvider";
import Dashboard from "./interfaces/Dashboard/Dashboard";
import { setBoards } from "./redux/reducers/boardsSlice";
import { useAppDispatch } from "./redux/hooks";
import Login from "./interfaces/Auth/Login/Login";
import Register from "./interfaces/Auth/Register/Register";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { hideUselessLogs } from "./utils/helpers";
import LowerCaseRedirect from "./components/LowerCaseRedirect/LowerCaseRedirect";
import "./App.scss";

function App(): JSX.Element {
	const { theme } = useContext(ThemeContext);
	const dispatch = useAppDispatch();

	useEffect(() => {
		hideUselessLogs();
	}, []);

	onAuthStateChanged(auth, (user) => {
		if (user) {
			const userDoc = doc(db, `users/${user.uid}`);
			onSnapshot(userDoc, (snap) => {
				dispatch(setBoards(snap.data()?.boards));
			});
		}
	});

	return (
		<div className="app" data-theme={theme}>
			<LowerCaseRedirect />
			<Routes>
				<Route path="/auth">
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</Route>
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="*" element={<Navigate to="/auth/login" />} />
			</Routes>
		</div>
	);
}

export default App;
