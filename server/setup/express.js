const express = require("express");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const path = require("path");
const caminho = path.join(__dirname, "..");

app.use(express.static(caminho));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

app.use(
	session({
		secret: "secret",
		resave: true,
		saveUninitialized: true,
		store: new MemoryStore({
			checkPeriod: 86400000,
		}),
		cookie: {
			httpOnly: true,
			maxAge: 86400000,
		},
		usuario: {
			id: null,
			apelido: null,
			logado: false,
			salas: [],
		},
	})
);

module.exports = { app, express, caminho };
