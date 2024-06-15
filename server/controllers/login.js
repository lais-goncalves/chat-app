const { express } = require("../setup/express.js");
const router = express.Router();
const Usuario = require("../models/Usuario.js");

router.post("/", (req, res) => {
	const b = req.body;

	const usuario = Usuario.selecionar(b.apelido, b.senha);

	if (usuario) {
		req.session.usuario = new Usuario(b.apelido, null, true);
		req.session.usuario.salas = [];

		req.session.save(() => {
			res.status(200).json({ usuario: req.session.usuario });
		});

		return;
	}

	res.status(401).json({ usuario: null });
});

module.exports = router;
