import { useState } from "react";
import { Form } from "../../../componentes/componentes";

const Componente = ({ sala, sessionUsuario, urlEntrar }) => {
	const [aviso, setAviso] = useState("");

	const entrarNaSala = (req) => {
		if (!req.ok) {
			if (req.status === 401) {
				setAviso("Senha incorreta!");
			} else {
				setAviso("Ocorreu um erro! Tente novamente mais tarde.");
			}
		} else {
			window.location.reload();
		}
	};

	return (
		<div id="sala-senha">
			<h1>Ensira a senha da sala para entrar</h1>

			<Form
				method="POST"
				url={urlEntrar}
				callback={entrarNaSala}
				body={{ usuario: { id: sessionUsuario.id } }}
			>
				<input type="password" name="senha" placeholder="senha" />

				<input type="submit" value="Entrar" id="btnEntrar" />

				<p>{aviso}</p>
			</Form>
		</div>
	);
};

export { Componente };
