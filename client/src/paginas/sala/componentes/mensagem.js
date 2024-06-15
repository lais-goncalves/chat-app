const Componente = ({ apelido, texto, usuario = false }) => {
	const classe = usuario ? "usuario" : "";

	return (
		<div className={`mensagem-conteiner ${classe}`}>
			<div className="mensagem">
				{!usuario && <p className="mensagem-remetente">{apelido}</p>}
				<p className="mensagem-texto">{texto}</p>
			</div>
		</div>
	);
};

export { Componente };
