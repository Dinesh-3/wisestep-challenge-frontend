import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import "./HomePage.css";

const HomePage = () => {
	const { useSession, useUser } = useAuth();
	const [sessionToken, setSessionToken] = useSession();
	const [user, setUser] = useUser();

	return (
		<section className='home-page'>
			{sessionToken === null ? (
				<h1>You are not logged in. Please login to continue...</h1>
			) : (
				<h1>{`Hi ${user?.firstName} ${user?.lastName}. You have successfully LoggedIn`}</h1>
			)}
		</section>
	);
};

export default HomePage;
