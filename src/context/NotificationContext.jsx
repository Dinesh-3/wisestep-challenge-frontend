import { createContext, useContext, useEffect, useState } from "react";

const NotificationContext = createContext();

const NotificationProvider = (props) => {
	const [items, setItems] = useState([]);

	const notify = ({ status = false, message = "Error" }) => {
		const id = Math.floor(Math.random() * 90000) + 10000;
		setItems((prev) => [...prev, { status, message, id }]);
		removeItem();
	};

	const removeItem = () => {
		setTimeout(() => {
			setItems((prev) => [...prev].slice(1));
		}, 2000);
	};

	return (
		<NotificationContext.Provider value={{ items, notify, setItems }}>
			{props.children}
		</NotificationContext.Provider>
	);
};

export const useNotification = () => {
	return useContext(NotificationContext);
};

export default NotificationProvider;
