import { doc, getDoc, updateDoc } from "firebase/firestore";
import React from "react";
import { Board } from "../types/types";
import { auth, db } from "../../firebaseConfig";
import { useAppSelector } from "../../redux/hooks";
import { selectBoards } from "../../redux/reducers/boardsSlice";

function useBoards() {
	const boards = useAppSelector(selectBoards);

	const setBoards = async (newBoards: Board[]) => {
		const userRef = doc(db, "users", auth.currentUser!.uid);

		updateDoc(userRef, {
			boards: newBoards,
		});
	};

	const addBoard = async (newBoard: Board) => {
		const userRef = doc(db, "users", auth.currentUser!.uid);
		const docSnap = await getDoc(userRef);
		const userData = docSnap.data();
		const boards: Board[] = userData?.boards;

		updateDoc(userRef, {
			boards: [...boards, newBoard],
		});
	};

	return { boards, setBoards, addBoard };
}

export default useBoards;
