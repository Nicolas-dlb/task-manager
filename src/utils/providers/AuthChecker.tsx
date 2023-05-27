import React, { ReactNode, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

function AuthChecker({ children }: { children: ReactNode }) {
	const [user, loading] = useAuthState(auth);
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const isAuthPage = ["/auth/login", "/auth/register"].includes(pathname);
	const isDashboard = pathname === "/dashboard";

	useEffect(() => {
		if (!user && !loading && isDashboard) {
			navigate("/auth/login");
		}

		if (user && !loading && isAuthPage) {
			navigate("/dashboard");
		}
	}, [pathname, user, loading]);

	if (loading || (user && isAuthPage) || (!user && isDashboard)) {
		return <LoadingScreen />;
	}

	return <>{children}</>;
}

export default AuthChecker;
