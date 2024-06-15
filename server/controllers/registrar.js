const { express } = require("../setup/express.js");
const router = express.Router();
const Usuario = require("../models/Usuario.js");

router.post("/", (req, res) => {
	const apelido = req.body.apelido;
	const senha = req.body.senha;

	const usuarioExistente = Usuario.jaExiste(apelido);

	if (!usuarioExistente) {
		const registrado = Usuario.registrar(apelido, senha);

		if (registrado) {
			const usuario = Usuario.selecionar(apelido, senha);
			res.status(200).json({ usuario: usuario });
			return;
		}
	}

	res.status(401).json({ usuario: null });
});

module.exports = router;
