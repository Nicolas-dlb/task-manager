import { ReactComponent as Logo } from "../../../assets/logo.svg";
import {
	signInAnonymously,
	signInWithEmailAndPassword,
	UserCredential,
} from "firebase/auth";
import { KeyboardEvent, useContext, useRef, useState } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebaseConfig";
import demoData from "../../../../data.json";
import { ReactComponent as HideIcon } from "./../../../assets/icon-hide.svg";
import { ReactComponent as ShowIcon } from "./../../../assets/icon-show.svg";
import { addIDToData } from "../../../utils/helpers";
import Spinner from "../../../components/Spinner/Spinner";
import { ThemeContext } from "../../../utils/providers/ThemeProvider";
import { SubmitHandler, useForm } from "react-hook-form";
import DisplayError from "../components/DisplayError/DisplayError";
import "../Auth.scss";
import "./Login.scss";

export type AuthValues = {
	email: string;
	password: string;
};

function Login() {
	const passwordInputContainer = useRef<HTMLDivElement>(null);
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const { theme } = useContext(ThemeContext);
	const navigate = useNavigate();

	const { register, handleSubmit, formState } = useForm<AuthValues>();
	const { isSubmitting, errors } = formState;

	const showPasswordButton = useRef<HTMLButtonElement>(null);

	const signIn: SubmitHandler<AuthValues> = (data) => {
		setLoading(true);

		signInWithEmailAndPassword(auth, data.email, data.password)
			.then((data: UserCredential) => {
				setLoading(false);
				navigate("/dashboard");
			})
			.catch((error) => {
				setError(true);
				setLoading(false);
			});
	};

	const signInDemoAccount = () => {
		setLoading(true);

		signInAnonymously(auth)
			.then(async (credentials) => {
				const usersRef = collection(db, "users");
				const user = credentials.user;
				const demoBoards = addIDToData(demoData.boards);
				await setDoc(doc(usersRef, user.uid), {
					boards: demoBoards,
				});
				setLoading(false);
				navigate("/dashboard");
			})
			.catch((error) => {
				setError(true);
				setLoading(false);
			});
	};

	const togglePasswordVisibility = () => setShowPassword(!showPassword);

	const addFocusStylePasswordInput = () =>
		passwordInputContainer.current?.classList.add("focused");

	const blurPasswordInput = (e: any) => {
		const targetShowPasswordButton = e.relatedTarget?.classList.contains(
			"auth__form__btn-show-password"
		);

		if (!targetShowPasswordButton || e.code === "Tab") {
			passwordInputContainer.current?.classList.remove("focused");
		}
	};

	const handlePasswordKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		e.code === "Tab" && blurPasswordInput(e);
	};

	const handleShowPasswordButtonClick = () => {
		showPasswordButton.current?.focus();
		togglePasswordVisibility();
		addFocusStylePasswordInput();
	};

	return (
		<div data-theme={theme} className="auth">
			<Logo className="auth__form__logo" />
			<div className="auth__form__container">
				<form
					onSubmit={handleSubmit(signIn)}
					autoComplete="off"
					className="auth__form"
				>
					<h3 className="auth__form__welcome">Welcome</h3>
					<h2 className="auth__form__title">Login to your account</h2>

					<p className="error-message">
						{error && "Invalid email and password"}
					</p>

					<div className="auth__form__input__container">
						<div className="auth__form__label__container">
							<label className="auth__form__label" htmlFor="email">
								Email
							</label>
							<DisplayError errors={errors} property="email" />
						</div>
						<input
							type="email"
							spellCheck={false}
							id="email"
							disabled={isSubmitting}
							autoComplete="new-email"
							className={`auth__form__input ${
								(error || errors.email) && "error"
							}`}
							{...register("email", { required: "Can't be empty" })}
						/>
						<div className="auth__form__label__container">
							<label className="auth__form__label" htmlFor="password">
								Password
							</label>
							<DisplayError errors={errors} property="password" />
						</div>
						<div
							ref={passwordInputContainer}
							className={`auth__form__input ${
								(error || errors?.password) && "error"
							}`}
						>
							<input
								id="password"
								type={showPassword ? "text" : "password"}
								spellCheck={false}
								disabled={isSubmitting}
								autoComplete="false"
								onFocus={addFocusStylePasswordInput}
								onKeyDown={handlePasswordKeyDown}
								{...register("password", {
									required: "Can't be empty",
								})}
								onBlur={blurPasswordInput}
							/>
							<button
								type="button"
								onBlur={blurPasswordInput}
								ref={showPasswordButton}
								className="auth__form__btn-show-password"
								onClick={handleShowPasswordButtonClick}
							>
								{showPassword ? <HideIcon /> : <ShowIcon />}
							</button>
						</div>
					</div>

					{/* Trick to prevent browser autocomplete */}
					<input
						autoComplete="on"
						style={{ display: "none" }}
						id="fake-hidden-input-to-stop-google-address-lookup"
					></input>
					{/* Trick to prevent browser autocomplete */}

					<div className="auth__form__buttons">
						<button type="submit">Login</button>
						<button type="button" onClick={signInDemoAccount}>
							Demo Login
						</button>
					</div>

					<div className="auth__form__footer">
						<p className="auth__form__register">
							Not registered ? <Link to="/auth/register">Sign up</Link>
						</p>
					</div>
				</form>
			</div>

			{loading && <Spinner />}
		</div>
	);
}

export default Login;
