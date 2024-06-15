const { definirSockets } = require("./socket.js");

// express
const { app } = require("./express.js");

// socket.io
const server = require("http").createServer(app, (req, res) => {
	res.setHeader("Content-Type", "application/json");
});

const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
	},
});

definirSockets(io);

// EXPRESS
const router = require("./rotas.js");
app.use("/", router);

server.listen(8080, () =>
	console.log("Server listening on http://localhost:8080")
);
