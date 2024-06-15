import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "../../componentes/componentes.js";

const Login = ({ sessionUsuario }) => {
	const [mensagem, setMensagem] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (sessionUsuario != null) {
			navigate("/", { state: { update: true } });
		}
	});

	const logar = async (req, res) => {
		if (!req.ok) {
			setMensagem("Apelido e/ou senha incorreto(s).");
			return;
		}

		setMensagem("");
		navigate("/", { state: { update: true } });
	};

	return (
		<div id="login">
			<div className="titulo">
				<h1>Login</h1>
			</div>

			<Form url="login" method="POST" callback={logar}>
				<input type="text" name="apelido" placeholder="apelido" />

				<br />

				<input type="password" name="senha" placeholder="senha" />

				<br />

				<p>{mensagem}</p>

				<input type="submit" value="Logar" />
			</Form>
		</div>
	);
};

export default Login;
