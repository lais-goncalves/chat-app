const { express } = require("../setup/express.js");
const router = express.Router();
const Sala = require("../models/Sala.js");

router.get("/", (req, res) => {
	const salas = Sala.selecionarTodos();
	res.status(200).json({ salas: salas });
});

module.exports = router;
