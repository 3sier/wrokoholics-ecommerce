import React, { useState, useEffect } from "react";
import "./Carrito.scss";
import { IconButton } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserContex";

export default function Carrito() {
	const [productosEnCarrito, setProductosEnCarrito] = useState([]);
	const [totalProductos, setTotalProductos] = useState(0);
	const { loginUser, setLoginUser } = useUser();
	const navigate = useNavigate();
	useEffect(() => {
		const productosGuardados =
			JSON.parse(localStorage.getItem("carrito")) || [];

		const fetchPromises = productosGuardados.map((producto) => {
			const url = `http://localhost:3003/api/productos/id/${producto.id}`;

			return fetch(url)
				.then((response) => {
					if (!response.ok) {
						throw new Error(`Error en la solicitud para el ID ${producto.id}`);
					}
					return response.json();
				})
				.then((data) => {
					return { ...producto, apiData: data };
				})
				.catch((error) => {
					console.error(`Error para el ID ${producto.id}:`, error.message);
					throw error;
				});
		});

		Promise.all(fetchPromises)
			.then((productosActualizados) => {
				setProductosEnCarrito(productosActualizados);
			})
			.catch((error) => {
				console.error("Al menos una solicitud de fetch falló:", error);
			});
	}, []);

	useEffect(() => {
		const nuevoTotal = productosEnCarrito.reduce(
			(acc, producto) => acc + producto.apiData.price * producto.cantidad,
			0
		);
		setTotalProductos(nuevoTotal);
	}, [productosEnCarrito]);

	function agregarAlCarrito(producto) {
		let productos = JSON.parse(localStorage.getItem("carrito")) || [];
		const index = productos.findIndex((p) => p.id === producto.id);

		if (index !== -1) {
			productos[index].cantidad += producto.cantidad;
		} else {
			productos.push(producto);
		}

		localStorage.setItem("carrito", JSON.stringify(productos));
	}

	function handleDelete(productId) {
		const nuevosProductos = productosEnCarrito.filter(
			(producto) => producto.id !== productId
		);
		setProductosEnCarrito(nuevosProductos);
		localStorage.setItem("carrito", JSON.stringify(nuevosProductos));
	}

	function handleEnvio() {
		if (loginUser) {
			localStorage.setItem("totalcompra", totalProductos);
			navigate("/envio");
		} else {
			navigate("/Login", { state: { returnTo: "/Carrito" } });
		}
	}

	return (
		<>
			<span className="separator"></span>
			<div className="cart-container">
				<h2>Carrito de Compra</h2>
				{productosEnCarrito.length > 0 ? (
					<>
						<div className="cart-product-box">
							{productosEnCarrito.map((producto) => (
								<div className="cart-product-card" key={producto.id}>
									<div className="cart-product">
										<div className="img-container">
											<img
												src={producto.apiData.images[0]}
												alt={producto.apiData.name}
											/>
										</div>
										<div className="info-container">
											<div className="cart-text">
												<p>{producto.apiData.name}</p>
												<p>{producto.apiData.price}€</p>
												<p>{producto.talla}</p>
												<p>Cantidad: {producto.cantidad}</p>
												<p>
													Total: {producto.apiData.price * producto.cantidad}€
												</p>
											</div>
										</div>
										<IconButton onClick={() => handleDelete(producto.id)}>
											<DeleteOutlineOutlinedIcon />
										</IconButton>
										<div className="divider-line"></div>
									</div>
								</div>
							))}
						</div>
						<p className="cart-total">Total: {totalProductos}€</p>
						<button className="btn-cart-shipment" onClick={handleEnvio}>
							Ir a envío
						</button>
					</>
				) : (
					<>
						<div className="empty-cart">
							<p>No hay productos en el carrito.</p>
							<Link to={"/Productos"}>
								<button>Añade algo</button>
							</Link>
						</div>
					</>
				)}
			</div>
		</>
	);
}
