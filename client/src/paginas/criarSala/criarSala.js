import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "../../componentes/componentes.js";

const CriarSala = ({ sessionUsuario }) => {
	const [privSelecionado, setPrivSelecionado] = useState(false);
	const [elementoSenha, setElementoSenha] = useState(<></>);
	const [avisoParticipantes, setAvisoParticipantes] = useState("");
	const qtdMax = 60;
	const navigate = useNavigate();

	const rdbPrivSelecionado = () => {
		setPrivSelecionado(document.getElementById("rdbPrivada").checked);
	};

	useEffect(() => {
		if (sessionUsuario == null) {
			navigate("/");
		}

		if (!privSelecionado) {
			return setElementoSenha(<></>);
		}

		setElementoSenha(
			<>
				<br />
				<input type="text" placeholder="senha" name="senha" required />
			</>
		);
	}, [sessionUsuario, navigate, privSelecionado]);

	const verificarQtdParticipantes = (e) => {
		const valor = Number(e.target.value);

		if (valor > qtdMax) {
			return setAvisoParticipantes(
				`Não pode ultrapassar ${qtdMax} participantes.`
			);
		}

		if (valor < 1) {
			return setAvisoParticipantes(
				"Não pode ter menos do que 1 participante."
			);
		}

		setAvisoParticipantes("");
	};

	const criarSalaCallback = (req, res) => {
		if (!req.ok) {
			alert("Houve um erro ao tentar criar a sala! Tente novamente.");
		}

		alert("Sala criada com sucesso!");
		navigate("/");
	};

	return (
		<div id="criar-sala">
			<div className="titulo">
				<h1>Criar sala</h1>
			</div>

			<Form
				url="sala/criar"
				method="POST"
				body={{ usuario: { id: sessionUsuario?.id } }}
				callback={criarSalaCallback}
			>
				<input
					type="text"
					placeholder="nome da sala"
					name="nome"
					required
				/>

				<div className="form-grupo">
					<h3 className="form-grupo--titulo">
						Qtd. máxima de participantes
					</h3>

					<input
						type="number"
						max="60"
						min="1"
						name="qtdMax"
						defaultValue={5}
						onChange={verificarQtdParticipantes}
						required
					/>
				</div>

				<p className="p-aviso">{avisoParticipantes}</p>

				<div className="form-conteiner">
					<h3 className="form-conteiner--titulo">Tipo</h3>
					<div className="form-wrap-radio">
						<input
							type="radio"
							name="tipo"
							value="publica"
							id="rdbPublica"
							onChange={rdbPrivSelecionado}
						/>
						<label htmlFor="rdbPublica">pública</label>
					</div>

					<div className="form-wrap-radio">
						<input
							type="radio"
							name="tipo"
							value="privada"
							id="rdbPrivada"
							onChange={rdbPrivSelecionado}
						/>
						<label htmlFor="rdbPrivada">privada</label>
					</div>

					{elementoSenha}
				</div>

				<input type="submit" value="Criar sala" />
			</Form>
		</div>
	);
};

export default CriarSala;
