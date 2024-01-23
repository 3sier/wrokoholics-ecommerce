import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";
import { UserProvider } from "./Components/UserContex";
import ErrorCompra from "./Components/ErrorCompra/ErrorCompra";
import CompraCompletada from "./Components/CompraCompletada/CompraCompletada";
import Header from "./Components/Header/Header";
import Producto from "./Components/Producto/Producto";
import Usuario from "./Components/Usuario/Usuario";
import Carrito from "./Components/Carrito/Carrito";
import Productos from "./Components/Productos/Productos";
import Envio from "./Components/Envio/Envio";
import Landing from "./Components/Landing/Landing";
import Login from "./Components/Login/Login";
import Registro from "./Components/Registro/Registro";
import Resumen from "./Components/Resumen/Resumen";
import InfoPedido from "./Components/InfoPedido/InfoPedido";
import Stripe from "./Components/Stripe/Stripe";
import Footer from "./Components/Footer/Footer";
import "./App.scss";

function App() {
	return (
		<UserProvider>
			<Router>
				<AppContent />
			</Router>
		</UserProvider>
	);
}

function AppContent() {
	const [showFooter, setShowFooter] = React.useState(true);
	const location = useLocation();

	React.useEffect(() => {
		const currentPath = location.pathname;
		const shouldShowFooter =
			currentPath !== "/Carrito" &&
			currentPath !== "/Resumen" &&
			currentPath !== "/Payment" &&
			currentPath !== "/completed" &&
			currentPath !== "/cancel" &&
			currentPath !== "/usuario" &&
			currentPath !== "/Login" &&
			currentPath !== "/Registro" &&
			currentPath !== "/envio";
		setShowFooter(shouldShowFooter);
	}, [location.pathname]);

	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/Cancel" element={<ErrorCompra />} />
				<Route path="/Completed" element={<CompraCompletada />} />
				<Route path="/Producto/:id" element={<Producto />} />
				<Route path="/Usuario" element={<Usuario />} />
				<Route path="/Carrito" element={<Carrito />} />
				<Route path="/Productos" element={<Productos />} />
				<Route path="/Envio" element={<Envio />} />
				<Route path="/Login" element={<Login />} />
				<Route path="/Registro" element={<Registro />} />
				<Route path="/Resumen" element={<Resumen />} />
				<Route path="/InfoPedido" element={<InfoPedido />} />
				<Route path="/Payment" element={<Stripe />} />
			</Routes>
			{showFooter && <Footer />}
		</>
	);
}

export default App;
