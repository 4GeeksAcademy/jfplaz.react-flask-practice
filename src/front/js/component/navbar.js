import React, {useContext} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const {store} = useContext(Context)
	console.log(store.auth);
	
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{store.auth ? <Link to="/demo">
						<button className="btn btn-primary">Logout</button>
					</Link>:null}
				</div>
			</div>
		</nav>
	);
};
