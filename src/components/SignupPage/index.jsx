import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import request from "../../services/request";
import REGEX_PATTERN from "../../util/regexPattern";

const initForm = {
	firstName: "",
	lastName: "",
	email: "",
};

const initValid = {
	firstName: true,
	lastName: true,
	email: true,
};

const REGEX_VALIDATION = {
	firstName: {
		pattern: REGEX_PATTERN.name,
		message: "First Name is Required",
	},
	lastName: {
		pattern: REGEX_PATTERN.name,
		message: "Last Name is Required",
	},
	email: {
		pattern: REGEX_PATTERN.email,
		message: "Invalid Email Format",
	},
};

const Signup = () => {
	const navigate = useNavigate();
	const { notify } = useNotification();

	const [form, setForm] = useState(initForm);
	const [loading, setLoading] = useState(false);

	const [valid, SetValid] = useState(initValid);

	const handleChange = (event) => {
		const key = event.target.name;
		const value = event.target.value;

		setForm((prev) => ({ ...prev, [key]: value }));
	};

	const signup = async (event) => {
		event.preventDefault();
		setLoading(true);
		if (!isFormValid()) return;

		const response = await request({ path: "/user/signup", method: "POST", body: form });
		setLoading(false);
		if (response.status) return navigate("/login");

		notify({ message: response.message });
	};

	const handleLoading = async (method, ...params) => {
		setLoading(true);
		await method(...params);
		setLoading(false);
	};

	const isFormValid = () => {
		const entries = Object.entries(form);

		for (const [key, value] of entries) {
			if (!REGEX_VALIDATION[key].pattern.test(value)) {
				alert(REGEX_VALIDATION[key].message);
				setLoading(false);
				return false;
			}
		}

		return true;
	};

	return (
		<form className='d-flex flex-column gap-4 w-50 m-auto my-5'>
			<h1 className='h3 mb-3 fw-normal'>Please sign in</h1>

			<div className='form-floating'>
				<input
					type='firstName'
					value={form.firstName}
					onChange={handleChange}
					className='form-control'
					id='firstName'
					name='firstName'
					placeholder='First Name'
					required
				/>
				<label htmlFor='firstName'>FirstName</label>
			</div>

			<div className='form-floating'>
				<input
					type='lastName'
					value={form.lastName}
					onChange={handleChange}
					className='form-control'
					id='lastName'
					name='lastName'
					placeholder='Last Name'
					required
				/>
				<label htmlFor='lastName'>LastName</label>
			</div>

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

			<button
				className='w-100 btn btn-lg btn-primary'
				onClick={(event) => handleLoading(signup, event)}
				disabled={loading}
			>
				Sign Up
			</button>
			<div>
				<p>
					Already have an account ? <Link to='/login'>Login</Link>
				</p>
			</div>
		</form>
	);
};

export default Signup;
