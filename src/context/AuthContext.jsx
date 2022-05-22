import { createContext, useContext, useEffect, useState } from "react";
import request from "../services/request";
import { useNotification } from "./NotificationContext";

const AuthContext = createContext();

const initUser = {
	firstName: "",
	lastName: "",
	email: "",
};

const AuthProvider = (props) => {
	const [sessionToken, setSessionToken] = useState(null);
	const [user, setUser] = useState();
	const { notify } = useNotification();

	useEffect(() => {
		ListenWindowClose();

		const storedSessionToken = sessionStorage.getItem("sessionToken");
		const storedUser = sessionStorage.getItem("user");
		if (isValidValue(storedSessionToken)) setSessionToken(storedSessionToken);
		if (isValidValue(storedUser)) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	useEffect(() => {
		sessionToken && sessionStorage.setItem("sessionToken", sessionToken);
		user && user.id && sessionStorage.setItem("user", JSON.stringify(user));
	}, [sessionToken, user]);

	const logoutSession = async () => {
		const response = await request({
			path: "/user/logout",
			headers: { "session-token": sessionStorage.getItem("sessionToken") },
		});

		if (!response.status) {
			notify({ message: response.message });
			return;
		}

		sessionStorage.clear();
		setUser(null);
		setSessionToken(null);
		return "success";
	};

	const isValidValue = (value) => {
		if (!value) return false;
		if (value == "null") return false;
		if (value == "undefined") return false;
		return true;
	};

	const ListenWindowClose = () => {
		window.addEventListener("beforeunload", (ev) => {
			ev.preventDefault();

			return (ev.returnValue = logoutSession());
		});
	};

	const contextValue = {
		useSession: () => [sessionToken, setSessionToken],
		useUser: () => [user, setUser],
		logoutSession,
	};

	return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};

export default AuthProvider;
