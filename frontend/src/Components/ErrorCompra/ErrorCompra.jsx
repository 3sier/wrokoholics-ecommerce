import React from "react";
import "./ErrorCompra.scss";
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";

const ErrorCompra = () => {
	const navigateBack = () => {};

	return (
		<>
			<span className="separator"></span>
			<div className="error-page">
				<main className="main-content">
					<div className="status-indicator">
						<ClearIcon className="error-icon" sx={{ fontSize: 90 }} />
					</div>
					<div className="text-box">
						<h2>Error en el pago</h2>
						<p>
							Ups, algo ha salido mal en el proceso de pago, revisa tus datos e
							inténtalo de nuevo
						</p>
					</div>
					<div className="buttons-error">
						<Link to="/Carrito">
							<button onClick={navigateBack}>Volver al carrito</button>
						</Link>
					</div>
				</main>
			</div>
		</>
	);
};

export default ErrorCompra;
