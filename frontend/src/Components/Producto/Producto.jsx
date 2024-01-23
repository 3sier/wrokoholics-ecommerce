import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "./Producto.scss";
import { Link, useParams } from "react-router-dom";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import IconButton from "@mui/material/IconButton";
import { useMediaQuery } from "@mui/material";

export default function Producto() {
	const [selectedImage, setSelectedImage] = useState(null);
	const [productImages, setProductImages] = useState([]);
	const [isNavActive, setIsNavActive] = useState(false);

	const { id } = useParams();
	const [respuesta, setRespuesta] = useState(null);
	const [carrito, setCarrito] = useState(
		JSON.parse(localStorage.getItem("carrito")) || []
	);
	const [selectedSize, setSelectedSize] = useState("");
	const [addedToCartMessage, setAddedToCartMessage] = useState("");

	useEffect(() => {
		apiCall(`http://localhost:3003/api/productos/id/` + id);
	}, [id]);

	useEffect(() => {
		localStorage.setItem("carrito", JSON.stringify(carrito));
	}, [carrito]);

	useEffect(() => {
		setProductImages(respuesta?.images || []);
	}, [respuesta]);

	useEffect(() => {
		if (productImages.length > 0) {
			const initialSelectedImage = productImages[0];
			setSelectedImage(initialSelectedImage);
		}
	}, [productImages]);

	const apiCall = (url) => {
		fetch(url)
			.then((res) => res.json())
			.then((res) => {
				setRespuesta(res);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const selectImage = (image) => {
		setSelectedImage(image);
		setProductImages((prevImages) => [
			image,
			...prevImages.filter((img) => img !== image),
		]);
	};

	const toggleNavigation = () => {
		setIsNavActive((prev) => !prev);
	};

	const handleSizeChange = (event) => {
		setSelectedSize(event.target.value);
	};

	const añadirAlCarrito = (e) => {
		e.stopPropagation();
		const cantidadProducto = parseInt(
			document.getElementById("quantity").value
		);

		const productoParaCarrito = {
			id: respuesta._id,
			precio: respuesta.price,
			cantidad: cantidadProducto,
			talla: selectedSize || (respuesta.sizes && respuesta.sizes[0]?.size),
		};

		let idExistente = false;

		let productsjoder = localStorage.getItem("carrito");

		let responseDos = JSON.parse(productsjoder);

		//estoy pensando sin prisa

		responseDos.forEach((resp) => {
			console.log(resp.id, productoParaCarrito.id);
			if (resp.id === productoParaCarrito.id) {

				resp.cantidad += productoParaCarrito.cantidad;
				idExistente = true;
			}
		});

		if (!idExistente) {
			responseDos.push(productoParaCarrito);
		}

		setCarrito(responseDos);
		setAddedToCartMessage("Producto añadido al carrito");
		responseDos = JSON.stringify(responseDos);
		localStorage.setItem("carrito", responseDos);
	};

	return (
		respuesta && (
			<>
				<span className="separator"></span>
				<Link to={"/Productos"}>
					<IconButton>
						<ArrowBackIosRoundedIcon />
					</IconButton>
				</Link>
				<div className="producto-container">
					<div className="producto-header">
						<h2>{respuesta.name}</h2>
						<p>{respuesta.price}€</p>
					</div>
					<div className="gallery-container">
						{productImages.map((image, i) => (
							<div
								key={i}
								className={`gallery-item ${selectedImage === image ? "selected" : ""
									}`}
								onClick={() => selectImage(image)}
							>
								<img alt={`Product ${i + 1}`} src={image} />
							</div>
						))}
					</div>
					<div className="description">
						<p>{respuesta.description}</p>
					</div>
					<div className="input-box">
						{respuesta.sizes ? (
							<select onChange={handleSizeChange}>
								{respuesta.sizes.map((size, index) => (
									<option key={index} value={size.size}>
										{size.size}
									</option>
								))}
							</select>
						) : (
							<select name="Unique" id="Unique">
								<option value="Unique">U</option>
							</select>
						)}
						<input defaultValue="1" id="quantity" min="1" type="number" />
					</div>
					{addedToCartMessage && (
						<p className="added-to-cart-message">{addedToCartMessage}</p>
					)}
					<Button
						className="product-button"
						onClick={(e) => añadirAlCarrito(e)}
					>
						Añadir a la cesta
					</Button>
				</div>
			</>
		)
	);
}
