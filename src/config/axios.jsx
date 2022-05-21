import axios from "axios";

export const initConfig = () => {
	axios.defaults.baseURL = "http://localhost:8080/api/v1";

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
