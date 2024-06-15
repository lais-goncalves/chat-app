import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Aviso } from "../../componentes/componentes.js";
import * as Senha from "./componentes/senha.js";
import * as Default from "./componentes/default.js";
import {
	fetchDadosSala,
	fetchEntrarSala,
	fetchMensagens,
} from "./utils/fetch.js";

import "./sala.css";

const Sala = ({ sessionUsuario }) => {
	const params = useParams();
	const [sala, setSala] = useState(null);
	const [mensagens, setMensagens] = useState([]);
	const [mensagensFetched, setMensagensFetched] = useState(false);
	const [urlEntrar, setUrlEntrar] = useState(null);

	useEffect(() => {
		fetchDadosSala(params.url, setSala, setUrlEntrar);
	}, [params]);

	const componentes = () => {
		// VERIFICAR:

		// se sala existe
		if (sala === null) {
			return <Aviso titulo="Esta sala não existe!" />;
		}

		// se usuário está logado
		else if (sessionUsuario == null) {
			return (
				<Aviso
					titulo={
						<>
							Você precisa estar logado para acessar esta sala!{" "}
							<Link to="/login">Ir para login</Link>.
						</>
					}
				/>
			);
		}

		// se usuário pode entrar na sala
		else if (!sessionUsuario.salas.includes(sala.id)) {
			// verificar se está lotada
			if (sala.participantes.length >= sala.qtd_max) {
				return <Aviso titulo="Esta sala está lotada!" />;
			} else {
				// verificar se tem senha
				if (sala.senha !== null) {
					return (
						<Senha.Componente
							sala={sala}
							sessionUsuario={sessionUsuario}
							urlEntrar={urlEntrar}
						/>
					);
				}

				fetchEntrarSala(urlEntrar, sessionUsuario);
			}
		}

		if (!mensagensFetched) {
			fetchMensagens(params.url, setMensagens, setMensagensFetched);
		}

		return (
			<Default.Componente
				sala={sala}
				sessionUsuario={sessionUsuario}
				mensagens={mensagens}
				setMensagens={setMensagens}
			/>
		);
	};

	return <>{componentes()}</>;
};

export default Sala;
