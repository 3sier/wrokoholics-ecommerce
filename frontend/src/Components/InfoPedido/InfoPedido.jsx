import { useEffect } from "react";
import "./InfoPedido.scss";

export default function InfoPedido({ order }) {
	useEffect(() => {
		console.log("Información del pedido:", order);
	}, [order]);

	function getStatus(status) {
		switch (status) {
			case "Pendiente":
				return "pending";
			case "Entregado":
				return "completed";
			case "Cancelado":
				return "canceled";
			default:
				return "";
		}
	}

	return (
		<>
			<span className="separator"></span>
			<div className="info-container">
				<p className="order-number">Pedido#{order.num}</p>
				<p className="order-price">{order.precio}€</p>
				<p className="order-date">Fecha: {order.date}</p>
				<p className="order-payment">Pago: Tarjeta</p>
				<badge className={`order-status ${getStatus(order.status)}`}>
					{order.status}
				</badge>
			</div>
		</>
	);
}
