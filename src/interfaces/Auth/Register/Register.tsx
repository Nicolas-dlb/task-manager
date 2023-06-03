import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../../assets/logo.svg";
import { auth, db } from "../../../firebaseConfig";
import { getDefaultBoard, validEmailRegex } from "../../../utils/helpers";
import Spinner from "../../../components/Spinner/Spinner";
import { ThemeContext } from "../../../utils/providers/ThemeProvider";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthValues } from "../Login/Login";
import DisplayError from "../components/DisplayError/DisplayError";
import "../Auth.scss";

function Register() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>();

	const { register, handleSubmit, formState } = useForm<AuthValues>({
		mode: "onChange",
	});

	const { errors, isSubmitting, isValid } = formState;

	const { theme } = useContext(ThemeContext);

	const navigate = useNavigate();

	const createUser: SubmitHandler<AuthValues> = (data) => {
		const usersRef = collection(db, "users");

		setLoading(true);
		createUserWithEmailAndPassword(auth, data.email, data.password)
			.then(async (credentials) => {
				const user = credentials.user;

				const defaultBoards = getDefaultBoard();

				await setDoc(doc(usersRef, user.uid), {
					boards: defaultBoards,
				});

				setLoading(false);
				navigate("/dashboard");
			})
			.catch((error) => {
				const errorCode = error.code;
				const userExist = errorCode.includes("already-in-use");
				userExist && setError("User already exists");
				setLoading(false);
			});
	};

	const handleClickBack = () => navigate("/auth/login");

	const emailValidationSchema = {
		required: "Can't be empty",
		pattern: {
			value: validEmailRegex,
			message: "Should be valid email address",
		},
	};

	const passwordValidationSchema = {
		required: "Can't be empty",
		minLength: { value: 6, message: "6 characters minimum" },
	};

	return (
		<div data-theme={theme} className="auth">
			<Logo className="auth__form__logo" />
			<div className="auth__form__container">
				<form
					autoComplete="off"
					onSubmit={handleSubmit(createUser)}
					className="auth__form"
				>
					<h2 className="auth__form__title">Create an account</h2>
					<p className="error-message">{error}</p>

					<div className="auth__form__input__container">
						<div className="auth__form__label__container">
							<label className="auth__form__label" htmlFor="email">
								Email
							</label>
							<DisplayError errors={errors} property="email" />
						</div>
						<input
							id="email"
							type="email"
							spellCheck={false}
							disabled={isSubmitting}
							autoComplete="new-email"
							className={`auth__form__input ${
								(errors.email || error) && "error"
							}`}
							{...register("email", emailValidationSchema)}
						/>
						<div className="auth__form__label__container">
							<label className="auth__form__label" htmlFor="password">
								Password
							</label>
							<DisplayError errors={errors} property="password" />
						</div>
						<input
							id="password"
							type="text"
							spellCheck={false}
							autoComplete="new-password"
							disabled={isSubmitting}
							className={`auth__form__input ${errors.password && "error"}`}
							{...register("password", passwordValidationSchema)}
						/>
					</div>

					{/* Trick to prevent browser autocomplete */}
					<input
						autoComplete="on"
						style={{ display: "none" }}
						id="fake-hidden-input-to-stop-google-address-lookup"
					></input>
					{/* Trick to prevent browser autocomplete */}

					<div className="auth__form__buttons">
						<button disabled={!isValid} type="submit">
							Create account
						</button>
						<button type="button" onClick={handleClickBack}>
							Back
						</button>
					</div>
				</form>
			</div>

			{loading && <Spinner />}
		</div>
	);
}

export default Register;
