import axios from "axios";

export const initConfig = () => {
	console.log(process.env.NODE_ENV);
	const host =
		process.env.NODE_ENV === "development"
			? "http://localhost:8080"
			: "https://auth-two-backend.herokuapp.com";
	axios.defaults.baseURL = `${host}/api/v1`;

	axios.defaults.headers.post["Content-Type"] = "application/json";

	axios.interceptors.response.use(
		function (response) {
			return Promise.resolve(response);
		},
		function (error) {
			return Promise.reject(error);
		}
	);
};

initConfig();

export default axios;
