const Aviso = ({ titulo, texto }) => {
	return (
		<div className="aviso">
			<h2>{titulo}</h2>
			<p>{texto}</p>
		</div>
	);
};

export default Aviso;
