import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import request from "../../services/request";
import REGEX_PATTERN from "../../util/regexPattern";

const initForm = {
	email: "",
	otp: "",
};

const initOtpState = {
	content: "SEND OTP",
	timerCount: 0,
	runTimer: false,
};

const initValid = {
	email: true,
	otp: true,
};

const REGEX_VALIDATION = {
	email: {
		pattern: REGEX_PATTERN.email,
		message: "Invalid Email",
		isValid: true,
	},
	otp: {
		pattern: REGEX_PATTERN.token,
		message: "Token must be 5 digit number",
		isValid: true,
	},
};

const Login = () => {
	const { notify } = useNotification();
	const navigate = useNavigate();

	const [form, setForm] = useState(initForm);
	const [loading, setLoading] = useState(false);

	const [valid, SetValid] = useState(initValid);

	const [otpState, setOtpState] = useState(initOtpState);

	useEffect(() => {
		let timerId;

		if (otpState.runTimer) {
			setOtpState((prev) => ({ ...prev, timerCount: 60 * 5 }));
			timerId = setInterval(() => {
				setOtpState((prev) => ({ ...prev, timerCount: prev.timerCount - 1 }));
			}, 1000);
		} else {
			clearInterval(timerId);
		}

		return () => clearInterval(timerId);
	}, [otpState.runTimer]);

	useEffect(() => {
		if (otpState.timerCount < 0 && otpState.runTimer) {
			setOtpState((prev) => ({ ...prev, runTimer: false, timerCount: 0 }));
		}
	}, [otpState.timerCount, otpState.runTimer]);

	const handleChange = (event) => {
		const key = event.target.name;
		const value = event.target.value;

		setForm((prev) => ({ ...prev, [key]: value }));
	};

	const sendOtp = async (event) => {
		event.preventDefault();

		setLoading(true);

		if (!REGEX_VALIDATION.email.pattern.test(form.email)) {
			notify({ message: REGEX_VALIDATION.email.message });
			setLoading(false);
			return;
		}

		const response = await request({ path: "/user/email", body: form, method: "POST" });
		setLoading(false);
		if (!response.status) return notify({ message: response.message });

		notify({ message: "Otp sent Please check email Inbox and Spam too" });
		setOtpState(() => ({ runTimer: true }));
	};

	const handleSignin = async (event) => {
		event.preventDefault();
		setLoading(true);
		if (!isValidForm()) return;

		const response = await request({ path: "/api/login", body: form });
		setLoading(false);
		if (!response.status) notify({ message: response.message });

		notify({ status: true, message: response.message });
		navigate("/");
	};

	const isValidForm = () => {
		const entries = Object.entries(form);

		for (const [key, value] of entries) {
			console.log({ key, value });
			if (!REGEX_VALIDATION[key].pattern.test(value)) {
				notify({ message: REGEX_VALIDATION[key].message });
				setLoading(false);
				return false;
			}
		}

		return true;
	};

	const seconds = String(otpState.timerCount % 60).padStart(2, 0);
	const minutes = String(Math.floor(otpState.timerCount / 60)).padStart(2, 0);

	return (
		<form className='d-flex flex-column gap-4 w-50 m-auto my-5'>
			<h1 className='h3 mb-3 fw-normal'>Please sign in</h1>

			<div className='form-floating'>
				<input
					type='email'
					value={form.email}
					onChange={handleChange}
					className='form-control'
					id='email'
					name='email'
					placeholder='name@example.com'
					required
				/>
				<label htmlFor='email'>Email address</label>
			</div>

			<div className='d-flex gap-1 justify-content-between'>
				<button
					className='w-25 btn btn-secondary'
					onClick={sendOtp}
					disabled={otpState.runTimer}
				>
					{otpState.runTimer ? `${minutes}:${seconds}` : "Send Otp"}
				</button>
				<div className='form-floating'>
					<input
						value={form.otp}
						onChange={handleChange}
						className='form-control w-100'
						id='otp'
						name='otp'
						placeholder='OTP'
						required
					/>
					<label htmlFor='otp'>OTP</label>
				</div>
			</div>
			<button
				className='w-100 btn btn-lg btn-primary'
				onClick={handleSignin}
				disabled={loading}
			>
				Sign in
			</button>
		</form>
	);
};

export default Login;
