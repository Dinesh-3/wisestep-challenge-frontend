import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/LoginPage";
import Signup from "./components/SignupPage";
import NotificationProvider from "./context/NotificationContext.jsx";
import Notification from "./components/Notification";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";

function App() {
	return (
		<main>
			<NotificationProvider>
				<BrowserRouter>
					<Notification />
					<NavBar />
					<Routes>
						<Route path='/login' element={<Login />} />
						<Route path='/signup' element={<Signup />} />
						<Route path='/' element={<HomePage />} />
					</Routes>
				</BrowserRouter>
			</NotificationProvider>
		</main>
	);
}

export default App;
