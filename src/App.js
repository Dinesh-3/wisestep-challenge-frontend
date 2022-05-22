import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/LoginPage";
import Signup from "./components/SignupPage";
import NotificationProvider from "./context/NotificationContext.jsx";
import Notification from "./components/Notification";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import AuthProvider from "./context/AuthContext";

function App() {
	return (
		<main>
			<NotificationProvider>
				<AuthProvider>
					<BrowserRouter>
						<Notification />
						<NavBar />
						<Routes>
							<Route path='/login' element={<Login />} />
							<Route path='/signup' element={<Signup />} />
							<Route path='/' element={<HomePage />} />
						</Routes>
					</BrowserRouter>
				</AuthProvider>
			</NotificationProvider>
		</main>
	);
}

export default App;
