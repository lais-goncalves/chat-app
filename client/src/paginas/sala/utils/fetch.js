import { get, post } from "../../../conexao.js";
import { Aviso } from "../../../componentes/componentes";

const fetchDadosSala = (url, setSala, setUrlEntrar) => {
	get(`sala/${url}`, null, (req, res) => {
		if (req.ok) {
			setSala(res.sala);
			setUrlEntrar(`sala/${res.sala.url}/entrar`);
		}
	});
};

const fetchEntrarSala = (urlEntrar, sessionUsuario) => {
	post(
		urlEntrar,
		{ usuario: { id: sessionUsuario.id }, senha: null },
		null,
		(req, res) => {
			if (!req.ok) {
				return (
					<Aviso titulo="Ocorreu um erro! Tente novamente mais tarde." />
				);
			}
		}
	);
};

const fetchMensagens = (url, setMensagens, setMensagensFetched) => {
	get(`sala/${url}/mensagens`, null, (req, res) => {
		if (!req.ok) {
			return (
				<Aviso titulo="Ocorreu um erro! Tente novamente mais tarde." />
			);
		} else {
			setMensagens(res.mensagens);
		}

		setMensagensFetched(true);
	});
};

export { fetchDadosSala, fetchEntrarSala, fetchMensagens };
