const Banco = require("../dados/Banco.js");

class Mensagem {
	static #tabela = "mensagem";

	static registrar(texto, idRemetente, idSala) {
		return Banco.inserirNaTabela(
			this.#tabela,
			"texto, id_remetente, id_sala",
			[texto, idRemetente, idSala]
		);
	}

	static selecionarPorSala(idSala) {
		return Banco.selecionarVarios(
			"mensagem, usuario, sala",
			"mensagem.texto, usuario.apelido, usuario.id as idUsuario",
			`WHERE mensagem.id_sala = sala.id AND mensagem.id_remetente = usuario.id AND sala.id = ${idSala} ORDER BY mensagem.id ASC`
		);
	}
}

module.exports = Mensagem;
