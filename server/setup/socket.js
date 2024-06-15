const definirSockets = (io) => {
	let salaAtual = null;

	io.on("connection", (socket) => {
		socket.on("entrar", (sala) => {
			socket.join(sala);
			salaAtual = sala;
		});

		socket.on("mensagem", ({ sala, msg }) => {
			socket.broadcast.to(sala).emit("mensagem", msg);
		});

		socket.on("escrevendo", ({ sala, usuario }) => {
			socket.broadcast.to(sala).emit("escrevendo", usuario);
		});

		socket.on("parouDeEscrever", ({ sala, usuario }) => {
			socket.broadcast.to(sala).emit("parouDeEscrever", usuario);
		});

		socket.on("sairSalaAtual", () => {
			if (salaAtual) {
				socket.leave(salaAtual);
			}
		});
	});
};

module.exports = { definirSockets };
