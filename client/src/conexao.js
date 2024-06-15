import { io } from "socket.io-client";

const urlApi = "http://localhost:8080";
const socket = io(urlApi);

function fetchDadosAsync(url, method, body = null, headers = null) {
	return fetch(`${urlApi}/api/${url}`, {
		mode: "cors",
		method: method,
		credentials: "include",
		body: body != null ? JSON.stringify(body) : body,
		headers: headers || { "Content-Type": "application/json" },
	});
}

function fetchJsonCallback(promise, callback = null) {
	let req;

	promise
		.then((_req) => {
			req = _req;
			return req.json();
		})
		.then((res) => {
			return callback(req, res);
		});
}

function fetchDados(url, method, body = null, headers = null, callback) {
	const f = fetchDadosAsync(url, method, body, headers);

	fetchJsonCallback(f, (req, res) => {
		callback(req, res);
	});
}

function post(url, body, headers = null, callback = null) {
	fetchDados(url, "POST", body, headers, (req, res) => {
		callback(req, res);
	});
}

function get(url, headers = null, callback = null) {
	fetchDados(url, "GET", null, headers, (req, res) => {
		callback(req, res);
	});
}

export {
	urlApi,
	socket,
	fetchDadosAsync,
	fetchJsonCallback,
	fetchDados,
	post,
	get,
};
