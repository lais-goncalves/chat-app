import React from "react";
import { Link } from "react-router-dom";

import "./navbar.css";

const Navbar = ({ sessionUsuario }) => {
	const linksLogin = () => {
		if (sessionUsuario == null) {
			return (
				<>
					<li className="navbar-link">
						<Link to="/login">Login</Link>
					</li>
					<li className="navbar-link">
						<Link to="/registrar">Registrar</Link>
					</li>
				</>
			);
		} else {
			return (
				<>
					<li className="navbar-link">
						<Link to="/sala/criar">Criar sala</Link>
					</li>
				</>
			);
		}
	};

	return (
		<nav id="navbar">
			<ul id="navbar-lista">
				<li className="navbar-link">
					<Link to="/">Home</Link>
				</li>
				{linksLogin()}
			</ul>
		</nav>
	);
};

export default Navbar;
