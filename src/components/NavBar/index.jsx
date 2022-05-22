import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import request from "../../services/request";

const NavBar = () => {
	const { useSession, useUser, logoutSession } = useAuth();
	const [sessionToken, setSessionToken] = useSession();
	const [user, setUser] = useUser();
	const { notify } = useNotification();

	const navigate = useNavigate();

	const handleLogout = async (event) => {
		event.preventDefault();
		logoutSession();
		navigate("/login");
		notify({ message: "Logout Success", status: true });
	};

	return (
		<nav className='nav-bar px-5 py-2 navbar-dark bg-dark d-flex justify-content-between align-items-center'>
			<Link className='navbar-brand' to='/'>
				Two Factor Authentication
			</Link>
			<ul className='d-flex gap-4 .align-items-center'>
				{sessionToken === null ? (
					<>
						<li className='nav-item'>
							<Link className='nav-link active' aria-current='page' to='/signup'>
								Signup
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' to='/login'>
								Login
							</Link>
						</li>
					</>
				) : (
					<li>
						<button className='btn btn-secondary' onClick={handleLogout}>
							Logout
						</button>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default NavBar;
