import React, { useState, useEffect } from "react";
import { get } from "../../conexao";
import { Link } from "react-router-dom";

import "./home.css";

const Home = ({ sessionUsuario }) => {
	const [salas, setSalas] = useState([]);

	useEffect(() => {
		get("home", null, (req, res) => {
			setSalas(res.salas);
		});
	}, []);

	const saudacao = () => {
		const sair = () => {
			get("auth/sair", null, () => {
				window.location.reload();
			});
		};

		if (sessionUsuario == null) {
			return "Bem-vindo!";
		} else {
			return (
				<div id="subtitulo-home">
					<p>Bem-vindo(a), {sessionUsuario.apelido}!</p>
					<button id="linkSair" onClick={sair}>
						Sair
					</button>
				</div>
			);
		}
	};

	const salasComponentes = salas.map((sala, index) => (
		<Link to={`/sala/${sala.url}`} className="sala-link" key={index}>
			<div className="sala" key={index}>
				<h2 className="sala-nome">{sala.nome}</h2>

				<p>
					<b>{(sala.senha && "Privada") || "Pública"}</b>
				</p>

				<p>Máximo de participantes: {sala.qtd_max}</p>
			</div>
		</Link>
	));

	return (
		<div id="home">
			<div className="titulo">
				<h1>Home</h1>
				<h2>{saudacao()}</h2>
			</div>

			<div id="salas">{salasComponentes}</div>
		</div>
	);
};

export default Home;
