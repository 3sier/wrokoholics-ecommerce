import { useState, useEffect } from "react";
import "./Resumen.scss";
import { Link } from "react-router-dom";

export default function Resumen() {
	const [productosEnCarrito, setProductosEnCarrito] = useState([]);
	const [descuento, setDescuento] = useState(0);
	const [codigoDescuento, setCodigoDescuento] = useState("");
	const [total, setTotal] = useState(0);
	const [totalConDescuento, setTotalConDescuento] = useState(0);

	useEffect(() => {
		let totalTemp =
			parseInt(localStorage.getItem("totalcompra")) +
			parseFloat(localStorage.getItem("envio"));
		setTotal(totalTemp);
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

	function handleDescuento() {
		switch (codigoDescuento.toUpperCase()) {
			case "BIENVENIDA":
				setDescuento("15%");
				const totalConDescuentoBienvenida = total - total * 0.15;
				setTotalConDescuento(totalConDescuentoBienvenida.toFixed(2));
				localStorage.setItem(
					"totalFinal",
					totalConDescuentoBienvenida.toFixed(2)
				);
				break;
			case "NAVIDAD":
				setDescuento("5%");
				const totalConDescuento = total - total * 0.05;
				setTotalConDescuento(totalConDescuento.toFixed(2));
				localStorage.setItem("totalFinal", totalConDescuento.toFixed(2));
				break;
			case "ENVIOGRATIS":
				let envio = parseFloat(localStorage.getItem("envio"));
				setDescuento(envio + "€");
				const totalConDescuentoEnvioGratis = total - envio;
				setTotalConDescuento(totalConDescuentoEnvioGratis.toFixed(2));
				localStorage.setItem(
					"totalFinal",
					totalConDescuentoEnvioGratis.toFixed(2)
				);
				break;
			default:
				setDescuento(0);
				setTotalConDescuento(total);
				localStorage.setItem("totalFinal", totalConDescuento);

				break;
		}
	}

	return (
		<>
			<span className="separator"></span>
			<div className="resumen-container">
				<h2>Carrito de Compras</h2>
				{productosEnCarrito.length > 0 ? (
					<>
						<div className="resumen-product-box">
							{productosEnCarrito.map((producto) => (
								<div className="resumen-product-card" key={producto.id}>
									<div className="resumen-product">
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
												<p>Talla: {producto.talla}</p>
												<p>{producto.cantidad}</p>
												<p>{producto.apiData.price * producto.cantidad}€</p>
											</div>
										</div>
										<div className="divider-line"></div>
									</div>
								</div>
							))}
							<div className="resumen-total-box">
								<div className="resumen-discount">
									<input
										type="text"
										placeholder="Codigo descuento"
										value={codigoDescuento}
										onChange={(e) => setCodigoDescuento(e.target.value)}
									/>
									<button onClick={handleDescuento}>Aplicar</button>
								</div>
								<div className="resumen-products">
									<p>Productos: {localStorage.getItem("totalcompra")}€</p>
									<p>Envio: {localStorage.getItem("envio")}€</p>
									<p>Descuento: {descuento}€</p>
									<p>
										TOTAL: {totalConDescuento !== 0 ? totalConDescuento : total}
										€
									</p>
								</div>

								<div className="resumen-total">
									<Link to={"/Payment"}>
										<button>Finalizar</button>
									</Link>
								</div>
							</div>
						</div>
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
