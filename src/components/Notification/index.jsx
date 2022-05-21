import { useEffect, useState } from "react";
import { useNotification } from "../../context/NotificationContext.jsx";

import "./notification.css";

const status = {
	true: "alert-success",
	false: "alert-danger",
};

const Notification = ({ notify }) => {
	const { items, setItems } = useNotification();

	return (
		<div className='notify-container'>
			{items.map((item, index) => (
				<div
					className={`alert-card ${status[item.status]}`}
					role='alert'
					key={item.id}
					style={{ top: `${index * 5}rem` }}
				>
					<div>
						{item.message} {index}
					</div>
				</div>
			))}
		</div>
	);
};

export const notify = (item) => {};

export default Notification;
