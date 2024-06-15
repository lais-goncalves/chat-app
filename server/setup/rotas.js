const { express } = require("./express.js");
const router = express.Router();

// outras rotas
const rotas = ["auth", "home", "login", "registrar", "sala"];

rotas.forEach((rota) => {
	router.use(`/api/${rota}`, require(`../controllers/${rota}.js`));
});

module.exports = router;
