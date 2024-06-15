const Banco = require("../dados/Banco.js");
const uuid = require("uuid").v4;

class Sala {
	static #tabela = "sala";
	static #tabelaParticipantes = "usuario_sala";

	static jaExiste(nome) {
		return (
			Banco.selecionarUnico(
				this.#tabela,
				"nome",
				`WHERE nome = '${nome}'`
			) != null
		);
	}

	static registrar(nome, senha, qtdMax, idCriador) {
		let url;

		let existeUrlIgual = true;

		do {
			const uid = uuid();
			url = uid.slice(0, 8) + uid.slice(24, uid.length);

			const salaComMesmaUrl = this.selecionarPorUrl(url);
			existeUrlIgual = salaComMesmaUrl !== undefined;
		} while (existeUrlIgual);

		Banco.inserirNaTabela(
			this.#tabela,
			"url, nome, senha, qtd_max, id_criador",
			[url, nome, senha, qtdMax, idCriador]
		);

		const salaFoiInserida = this.selecionarPorUrl(url) || null;
		return salaFoiInserida;
	}

	static temParticipante(idUsuario, idSala) {
		return Banco.selecionarUnico(
			this.#tabelaParticipantes,
			"id_usuario",
			`WHERE id_usuario = '${idUsuario}' AND id_sala = '${idSala}'`
		);
	}

	static inserirParticipante(idUsuario, idSala) {
		const participanteExiste =
			Sala.temParticipante(idUsuario, idSala) || null;

		console.log(idUsuario, idSala);

		if (participanteExiste == null) {
			return Banco.inserirNaTabela(
				this.#tabelaParticipantes,
				"id_usuario, id_sala",
				[idUsuario, idSala]
			);
		}

		return false;
	}

	static selecionar(nome, senha) {
		return Banco.selecionarUnico(
			this.#tabela,
			"id",
			`WHERE nome = '${nome}' AND senha = '${senha}'`
		);
	}

	static selecionarPorId(id) {
		return Banco.selecionarUnico(this.#tabela, "*", `WHERE id = '${id}'`);
	}

	static selecionarPorUrl(url) {
		return Banco.selecionarUnico(this.#tabela, "*", `WHERE url = '${url}'`);
	}

	static selecionarParticipantes(id) {
		return Banco.selecionarVarios(
			"usuario, sala, usuario_sala",
			"usuario.id, usuario.apelido",
			`WHERE usuario.id = usuario_sala.id_usuario AND sala.id = usuario_sala.id_sala AND sala.id = '${id}'`
		);
	}

	static selecionarTodos() {
		return Banco.selecionarVarios(this.#tabela, "*");
	}
}

module.exports = Sala;
