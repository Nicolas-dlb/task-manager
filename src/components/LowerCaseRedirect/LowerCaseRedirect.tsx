import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function LowerCaseRedirect() {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		// Vérifie si l'URL contient des lettres majuscules
		if (location.pathname !== location.pathname.toLowerCase()) {
			// Redirige vers une URL en minuscules
			navigate(location.pathname.toLowerCase());
		}
	}, [location]);

	return null;
}

export default LowerCaseRedirect;
