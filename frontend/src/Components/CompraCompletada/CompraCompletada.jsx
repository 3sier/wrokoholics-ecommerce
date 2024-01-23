import React from "react";
import "./CompraCompletada.scss";
import { Link } from "react-router-dom";
import Usuario from "../Usuario/Usuario";
import Productos from "../Productos/Productos";
import CheckIcon from "@mui/icons-material/Check";

export default function ConfirmationPage() {
	return (
		<>
			<span className="separator"></span>
			<div className="confirmation-page">
				<main className="main-content">
					<div className="status-indicator">
						<CheckIcon className="check-icon" sx={{ fontSize: 90 }} />
					</div>
					<div className="text-box">
						<h2>Compra completada!</h2>
						<p>
							El pedido está registrado en nuestra web, en breves la empresa de
							transporte te mandará un número de seguimiento.
						</p>
					</div>

					<div className="buttons-completed">
						<Link to="/usuario" component={Usuario} className="profile-button">
							<button> Ir a mi perfil</button>
						</Link>
						<p>o</p>
						<Link
							to="/productos"
							component={Productos}
							className="continue-shopping"
						>
							<button> Seguir comprando </button>
						</Link>
					</div>
				</main>
			</div>
		</>
	);
}
