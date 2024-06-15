import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "../../componentes/componentes.js";

const Registrar = ({ sessionUsuario }) => {
	const [mensagem, setMensagem] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (sessionUsuario != null) {
			navigate("/", { state: { update: true } });
		}
	});

	const registrar = (req) => {
		if (!req.ok) {
			setMensagem("Este apelido já está sendo usado. Tente outro.");
			return;
		}

		setMensagem("Usuário registrado com sucesso!");
		navigate("/");
	};

	return (
		<div id="registrar">
			<div className="titulo">
				<h1>Registrar</h1>
			</div>

			<Form url="registrar" method="POST" callback={registrar}>
				<input type="text" name="apelido" placeholder="apelido" />

				<br />

				<input type="password" name="senha" placeholder="senha" />

				<br />

				<p>{mensagem}</p>

				<input type="submit" value="Registrar" />
			</Form>
		</div>
	);
};

export default Registrar;
