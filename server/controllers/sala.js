const { express } = require("../setup/express.js");
const router = express.Router();

const Sala = require("../models/Sala.js");
const Usuario = require("../models/Usuario.js");
const Mensagem = require("../models/Mensagem.js");

router.post("/criar", (req, res) => {
	const r = req.body;

	const salaFoiInserida = Sala.registrar(
		r.nome,
		r.senha,
		r.qtdMax,
		r.usuario.id
	);

	let participanteFoiInserido;

	if (salaFoiInserida) {
		participanteFoiInserido =
			Sala.inserirParticipante(r.usuario.id, salaFoiInserida.id) || null;
	}

	let status = participanteFoiInserido ? 200 : 400;
	res.status(status).json({});
});

router.get("/:url", (req, res) => {
	const sala = Sala.selecionarPorUrl(req.params.url);

	if (sala) {
		sala.participantes = Sala.selecionarParticipantes(sala.id);
		res.status(200).json({ sala: sala });
		return;
	}

	res.status(400).json({ sala: null });
});

router.post("/:url/entrar", (req, res) => {
	const sala = Sala.selecionarPorUrl(req.params.url);
	const usuario = Usuario.selecionarPorId(req.body.usuario.id);

	let status = 200;

	if (sala && usuario) {
		const senha = req.body.senha || null;
		const salas = Usuario.selecionarSalas(usuario.id).map(
			(sala) => sala.id
		);

		if (sala.senha !== null && sala.senha !== senha) {
			status = 401;
		} else if (!salas.includes(sala.id)) {
			const inseriu = Sala.inserirParticipante(usuario.id, sala.id);

			if (!inseriu) {
				status = 400;
			}
		}
	} else {
		status = 400;
	}

	res.status(status).json({});
});

router.get("/:url/mensagens", (req, res) => {
	const sala = Sala.selecionarPorUrl(req.params.url);

	if (sala) {
		const mensagens = Mensagem.selecionarPorSala(sala.id);
		res.status(200).json({ mensagens: mensagens });
	} else {
		res.status(400).json({});
	}
});

router.post("/:url/mensagem", (req, res) => {
	const mensagem = req.body.texto;

	let status = 200;

	if (mensagem !== "" && mensagem !== undefined) {
		const sala = Sala.selecionarPorUrl(req.params.url);

		if (sala) {
			const msgRegistrada = Mensagem.registrar(
				mensagem,
				req.body.usuario.id,
				sala.id
			);

			if (!msgRegistrada) {
				status = 400;
			}
		}
	}

	res.status(status).json({});
});

module.exports = router;
