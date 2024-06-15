const Database = require("better-sqlite3");
const conexao = new Database("./dados/chatapp.db");

class Banco {
	static #inserirDados(dados) {
		return dados.map(() => {
			return "?";
		});
	}

	static #inserirValores(values) {
		return values != "" ? "(" + values + ")" : "";
	}

	static #selecionarValores(values) {
		return values != "" ? values : "*";
	}

	static inserirNaTabela(tabela, values = "", dados) {
		const dadosParaInserir = this.#inserirDados(dados);
		const valores = this.#inserirValores(values);

		const resultado = conexao
			.prepare(
				`INSERT INTO ${tabela} ${valores} VALUES (${dadosParaInserir.join(
					","
				)})`
			)
			.run(dados);

		return resultado;
	}

	static selecionarUnico(tabela, values = "", condicao = "") {
		const valores = this.#selecionarValores(values);

		const resultado = conexao
			.prepare(`SELECT ${valores} FROM ${tabela} ${condicao}`)
			.get();

		return resultado;
	}

	static selecionarVarios(tabela, values = "", condicao = "") {
		const valores = this.#selecionarValores(values);

		const resultado = conexao
			.prepare(`SELECT ${valores} FROM ${tabela} ${condicao}`)
			.all();

		return resultado;
	}
}

module.exports = Banco;
