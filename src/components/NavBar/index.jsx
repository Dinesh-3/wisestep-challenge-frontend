import { Link } from "react-router-dom";

const NavBar = () => {
	return (
		<nav className='nav-bar px-5 py-2 navbar-dark bg-dark d-flex justify-content-between align-items-center'>
			<Link className='navbar-brand' to='/'>
				Two Factor Authentication
			</Link>
			<ul className='d-flex gap-4 .align-items-center'>
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
			</ul>
		</nav>
	);
};

export default NavBar;
