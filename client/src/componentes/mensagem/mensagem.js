class Classe {
	constructor(apelido, texto, idUsuario, idSala, usuario = false) {
		this.apelido = apelido;
		this.texto = texto;
		this.usuario = usuario;
		this.idSala = idSala;
		this.idUsuario = idUsuario;
	}
}

const Componente = ({ apelido, texto, usuario = false }) => {
	const classe = usuario ? "usuario" : "";

	return (
		<div className={`mensagem-conteiner ${classe}`}>
			<div className="mensagem">
				<p className="mensagem-remetente">{apelido}</p>
				<p className="mensagem-texto">{texto}</p>
			</div>
		</div>
	);
};

export { Classe, Componente };
