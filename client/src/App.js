import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
	Pagina,
	Home,
	Login,
	Registrar,
	Sala,
	CriarSala,
} from "./paginas/paginas.js";

import "./estilos/app.css";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					index
					path=""
					element={<Pagina Componente={Home} titulo="Home" />}
				/>
				<Route
					path="login"
					element={<Pagina Componente={Login} titulo="Login" />}
				/>
				<Route
					path="registrar"
					element={
						<Pagina Componente={Registrar} titulo="Registrar-se" />
					}
				/>
				<Route
					path="sala/:url"
					element={<Pagina Componente={Sala} titulo="Sala" />}
				/>
				<Route
					path="sala/criar"
					element={
						<Pagina Componente={CriarSala} titulo="Criar Sala" />
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
