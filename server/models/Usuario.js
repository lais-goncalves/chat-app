const Banco = require("../dados/Banco.js");

class Usuario {
	static #tabela = "usuario";
	static #tabelaParticipantes = "usuario_sala";

	constructor(apelido, senha = null, logado = false) {
		this.apelido = apelido;
		this.logado = logado;
		this.id = Usuario.getId(apelido).id;

		if (senha) {
			this.senha = senha;
		}
	}

	static jaExiste(apelido) {
		return (
			Banco.selecionarUnico(
				this.#tabela,
				"apelido",
				`WHERE apelido = '${apelido}'`
			) != null
		);
	}

	static registrar(apelido, senha) {
		return Banco.inserirNaTabela(this.#tabela, "apelido, senha", [
			apelido,
			senha,
		]);
	}

	static selecionar(apelido, senha) {
		return Banco.selecionarUnico(
			this.#tabela,
			"*",
			`WHERE apelido = '${apelido}' AND senha = '${senha}'`
		);
	}

	static selecionarPorId(id) {
		return Banco.selecionarUnico(this.#tabela, "*", `WHERE id = '${id}'`);
	}

	static selecionarSalas(id) {
		return Banco.selecionarVarios(
			"usuario, sala, usuario_sala",
			"sala.id",
			`WHERE usuario.id = usuario_sala.id_usuario AND sala.id = usuario_sala.id_sala AND usuario.id = '${id}'`
		);
	}

	static getId(apelido) {
		return Banco.selecionarUnico(
			this.#tabela,
			"id",
			`WHERE apelido = '${apelido}'`
		);
	}
}

module.exports = Usuario;
