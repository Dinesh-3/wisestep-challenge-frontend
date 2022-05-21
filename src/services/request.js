import axios from "../config/axios";

const request = async ({ path, body, params = {}, headers = {}, method = "GET" }) => {
	if (body) method = "POST";
	try {
		const response = await axios.request({
			method,
			url: `${path}`,
			params,
			data: body,
			headers,
		});
		const responseData = response["data"];
		return responseData;
	} catch (error) {
		return (
			error?.response?.data ?? {
				status: false,
				message: error["message"] || "Internal Server Error, Please try again",
				statusCode: error["statusCode"] || 500,
			}
		);
	}
};

export default request;
