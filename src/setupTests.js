/* eslint-disable import/no-extraneous-dependencies */
import matchers from "@testing-library/jest-dom/matchers";
import { expect, vi } from "vitest";
import { randomUUID } from "node:crypto";

window.crypto.randomUUID = randomUUID;

expect.extend(matchers);

const authObjectMock = {
	createUserAndRetrieveDataWithEmailAndPassword: vi.fn(() =>
		Promise.resolve(true)
	),
	sendPasswordResetEmail: vi.fn(() => Promise.resolve(true)),
	signInAndRetrieveDataWithEmailAndPassword: vi.fn(() => Promise.resolve(true)),
	fetchSignInMethodsForEmail: vi.fn(() => Promise.resolve(true)),
	signOut: vi.fn(() => {
		Promise.resolve(true);
	}),
	onAuthStateChanged: vi.fn(),
	currentUser: {
		sendEmailVerification: vi.fn(() => Promise.resolve(true)),
	},
};

const authMock = vi.fn(() => authObjectMock);

export { authMock };
