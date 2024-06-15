const { express } = require("../setup/express.js");
const Usuario = require("../models/Usuario.js");
const router = express.Router();

router.get("/", (req, res) => {
	if (req.session.usuario) {
		req.session.save(() => {
			req.session.usuario.salas = Usuario.selecionarSalas(
				req.session.usuario.id
			).map((sala) => sala.id);

			res.status(200).json({
				sessionUsuario: req.session.usuario,
			});
		});

		return;
	}

	res.status(200).json({
		sessionUsuario: null,
	});
});

router.get("/sair", (req, res) => {
	req.session.save(() => {
		req.session.usuario = null;

		res.status(200).json({ sessionUsuario: req.session.usuario });
	});
});

module.exports = router;
