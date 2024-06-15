import { socket } from "../../../conexao.js";
import { Form } from "../../../componentes/componentes";
import * as Mensagem from "./mensagem.js";
import { useEffect, useState } from "react";

const Componente = ({ sala, sessionUsuario, mensagens, setMensagens }) => {
	const msgConteiner = document.getElementById("chat-mensagens");
	const [participantesEscrevendo, setParticipantesEscrevendo] = useState([]);
	const [participantesEscTexto, setParticipantesEscTexto] = useState("");

	const ajustarChat = () => {
		if (msgConteiner) {
			msgConteiner.scrollTo(0, msgConteiner.scrollHeight);
		}
	};

	const atualizarParticipantesEscrevendoTexto = () => {
		if (participantesEscrevendo.length > 0) {
			const apelidos = participantesEscrevendo
				.map((part) => part.apelido)
				.join(",", " , ");

			if (participantesEscrevendo.length > 1) {
				setParticipantesEscTexto(apelidos + " estão escrevendo...");
			} else {
				setParticipantesEscTexto(apelidos + " está escrevendo...");
			}
		} else {
			setParticipantesEscTexto("");
		}
	};

	useEffect(() => {
		socket.emit("entrar", sala.id.toString());

		socket.on("mensagem", (msg) => {
			setMensagens([...mensagens, msg]);
			ajustarChat();
		});

		socket.on("escrevendo", (usuario) => {
			const ids = participantesEscrevendo.map((part) => part.id);

			if (!ids.includes(usuario.id)) {
				setParticipantesEscrevendo([
					...participantesEscrevendo,
					usuario,
				]);
			}
		});

		socket.on("parouDeEscrever", (usuario) => {
			const novosParticipantes = participantesEscrevendo.filter(
				(part) => {
					return part.id !== usuario.id;
				}
			);

			setParticipantesEscrevendo(novosParticipantes);
		});

		return () => {
			ajustarChat();
			atualizarParticipantesEscrevendoTexto();
			socket.off("escrevendo");
			socket.off("parouDeEscrever");
		};
	});

	useEffect(() => {
		ajustarChat();
	});

	useEffect(() => {
		atualizarParticipantesEscrevendoTexto();
	}, [participantesEscrevendo]);

	let escrevendo = setTimeout(() => {}, 0);

	const escrevendoMensagem = () => {
		const usuario = {
			apelido: sessionUsuario.apelido,
			id: sessionUsuario.id,
		};

		socket.emit("escrevendo", {
			sala: sala.id.toString(),
			usuario: usuario,
		});
		clearTimeout(escrevendo);

		escrevendo = setTimeout(() => {
			socket.emit("parouDeEscrever", {
				sala: sala.id.toString(),
				usuario: usuario,
			});
		}, 2000);
	};

	const enviarMensagem = () => {
		return document.getElementById("txtMensagem").value.trim() !== "";
	};

	const enviarMensagemCallback = (req, res) => {
		if (req.ok) {
			const txtMensagem = document.getElementById("txtMensagem");
			const texto = txtMensagem.value;

			if (texto.length > 0) {
				const msg = {
					apelido: sessionUsuario.apelido,
					texto: texto,
					idUsuario: sessionUsuario.id,
					usuario: true,
				};

				setMensagens((mensagens) => [...mensagens, msg]);
				msg.usuario = null;

				socket.emit("mensagem", { sala: sala.id.toString(), msg: msg });
				socket.emit("parouDeEscrever", {
					sala: sala.id.toString(),
					usuario: {
						apelido: sessionUsuario.apelido,
						id: sessionUsuario.id,
					},
				});
			}

			txtMensagem.value = "";
		}
	};

	return (
		<div id="sala">
			<div className="titulo">
				<h1>{sala.nome}</h1>
			</div>

			<div id="chat">
				<div id="chat-mensagens">
					{mensagens.map((msg, index) => {
						const usuario = msg.idUsuario === sessionUsuario.id;

						return (
							<Mensagem.Componente
								key={index}
								apelido={msg.apelido}
								texto={msg.texto}
								usuario={usuario}
							/>
						);
					})}
				</div>

				<div id="chat-escrevendo">
					<p id="participantes-escrevendo">{participantesEscTexto}</p>
				</div>

				<Form
					method="POST"
					url={`sala/${sala.url}/mensagem`}
					body={{
						usuario: {
							id: sessionUsuario.id,
						},
					}}
					callfirst={enviarMensagem}
					callback={enviarMensagemCallback}
				>
					<div id="chat-enviar-msg">
						<input
							name="texto"
							type="text"
							autoComplete="off"
							placeholder="Escrever..."
							id="txtMensagem"
							onChange={escrevendoMensagem}
						/>
						<input type="submit" value="Enviar" id="btnEnviar" />
					</div>
				</Form>
			</div>
		</div>
	);
};

export { Componente };
