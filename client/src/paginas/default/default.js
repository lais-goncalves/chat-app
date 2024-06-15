import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { get, socket } from "../../conexao.js";
import { Navbar } from "../../componentes/componentes.js";

import "./default.css";

const Pagina = ({ Componente, titulo }) => {
	const [sessionUsuario, setSessionUsuario] = useState(null);
	const location = useLocation();

	useEffect(() => {
		document.title = titulo;

		if (sessionUsuario == null) {
			get("auth", null, (req, res) => {
				setSessionUsuario(res.sessionUsuario);
			});
		}

		socket.emit("sairSalaAtual");
	}, [location.state, sessionUsuario, titulo]);

	return (
		<div className="App">
			<Navbar sessionUsuario={sessionUsuario} />
			<div className="pagina">
				<Componente sessionUsuario={sessionUsuario} />
			</div>
		</div>
	);
};

export default Pagina;
