import React, { useState, useEffect } from "react";
import "./Usuario.scss";

export default function Usuario() {
	const [orders, setOrders] = useState({ orders: [] });
	const [comprasFiltradas, setComprasFiltradas] = useState([]);
	const userId = localStorage.getItem("id");

	useEffect(() => {
		apiCall();
	}, []);

	useEffect(() => {
		setComprasFiltradas(orders.orders);
	}, [orders]);

	function apiCall() {
		fetch(`http://localhost:3003/api/user/${userId}`)
			.then((res) => res.json())
			.then((data) => {
				setOrders(data);
				console.log(data);
			})
			.catch((error) => {
				console.error("Error de la API:", error);
			});
	}

	function handleAll() {
		setComprasFiltradas(orders.orders);
	}

	function handlePending() {
		const filtered = orders.orders.filter((order) => {
			return order.status === "Pendiente";
		});
		setComprasFiltradas(filtered);
	}

	function handleComplete() {
		const filtered = orders.orders.filter((order) => {
			return order.status === "Entregado";
		});
		setComprasFiltradas(filtered);
	}
	function handleCanceled() {
		const filtered = orders.orders.filter((order) => {
			return order.status === "Cancelado";
		});
		setComprasFiltradas(filtered);
	}
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
			<div className="user-container">
				<main>
					<h2>Bienvenido {orders.name}</h2>
					<div className="user-filter-container">
						<h3>Mis compras</h3>
						<div className="user-filter">
							<button onClick={handleAll}>Todas</button>
							<button onClick={handlePending}>Pendientes</button>
							<button onClick={handleComplete}>Completadas</button>
							<button onClick={handleCanceled}>Canceladas</button>
						</div>
					</div>
					<div className="order-container">
						{comprasFiltradas?.map((order, i) => (
							<div
								key={i}
								className="order-card"
							>
								<div className="img-container">
									<img alt="Product" src={order.pedido[0].image} />
								</div>
								<div className="info-container">
									<p className="order-number">Pedido#{order.num}</p>
									<p className="order-price">{order.precio}€</p>
									<p className="order-date">Fecha: {order.date}</p>
									<p className="order-payment">Pago: Tarjeta</p>
									<badge className={`order-status ${getStatus(order.status)}`}>
										{order.status}
									</badge>
								</div>
							</div>

						))}
					</div>
				</main>
			</div>
		</>
	);
}
