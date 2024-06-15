import React from "react";
import { fetchDados } from "../../conexao";

import "./form.css";

const Form = ({
	id = "",
	url = "",
	method = "",
	body = {},
	children,
	callfirst = null,
	callback = null,
}) => {
	async function submit(e) {
		e.preventDefault();

		if (url !== "" && method !== "" && callback !== null) {
			const form = e.target;
			const formData = new FormData(form);
			const dados = { ...Object.fromEntries(formData), ...body };

			let resCallFirst = true;

			if (callfirst) {
				resCallFirst = callfirst() || false;
			}

			if (resCallFirst) {
				fetchDados(url, "POST", dados, null, (req, res) => {
					callback(req, res);
				});
			}
		}
	}

	return (
		<form onSubmit={submit} method={method} id={id}>
			{children}
		</form>
	);
};

export default Form;
