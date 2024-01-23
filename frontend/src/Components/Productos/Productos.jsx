import React, { useState, useEffect } from "react";
import { useProductos } from "../../hooks/useProductos";
import "./Productos.scss";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import Slide from "@mui/material/Slide";
import CheckIcon from "@mui/icons-material/Check";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

export default function Productos() {
	const [selectedSize, setSelectedSize] = useState("");
	const { id } = useParams();
	const { productos, getProductos } = useProductos();
	const navigate = useNavigate();
	const isMobile = useMediaQuery("(max-width: 768px)");
	const iconSize = isMobile ? "" : "small";
	const [size, setSize] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const [carrito, setCarrito] = useState(
		JSON.parse(localStorage.getItem("carrito")) || []
	);
	const [addedToCartMessage, setAddedToCartMessage] = useState("");

	const Transition = React.forwardRef(function Transition(props, ref) {
		return <Slide direction="up" ref={ref} {...props} />;
	});

	const [open, setOpen] = React.useState(false);

	useEffect(() => {
		getProductos();
	}, [getProductos]);

	useEffect(() => {
		localStorage.setItem("carrito", JSON.stringify(carrito));
	}, [carrito]);

	const handleProductClick = (productId) => {
		navigate(`/Producto/${productId}`);
	};

	const handleSelectSize = (e) => {
		e.stopPropagation();
		setSize(e.target.value);

	};

	const handleSelectClick = (e) => {
		e.stopPropagation();
	};

	const handleSelectQuant = (e) => {
		e.stopPropagation();
	};

	const handleAddToCart = (e, product) => {
		e.stopPropagation();


		let productoParaCarrito = {};

		let pr = productos.filter(prod => {
			return prod._id === product._id;
		});

		if (pr.length > 0 && product.sizes) {
			productoParaCarrito = {
				id: product._id,
				precio: product.price,
				cantidad: quantity,
				talla: selectedSize,
			};
		} else {
			productoParaCarrito = {
				id: product._id,
				precio: product.price,
				cantidad: quantity
			};
		}


		let productsjoder = localStorage.getItem("carrito");
		let products = JSON.parse(productsjoder);

		if (products && Array.isArray(products)) {
			let tempArray = products.filter(product => product.id === productoParaCarrito.id && size === product.talla);

			if (tempArray.length > 0) {
				tempArray[0].cantidad += quantity;
				let secTempArray = products.filter(product => product.talla !== selectedSize);
				secTempArray.push(tempArray[0]);
				setCarrito(secTempArray);
			} else {
				setCarrito([...products, productoParaCarrito]);


				setAddedToCartMessage("Producto añadido al carrito");
				products = JSON.stringify(products);
				localStorage.setItem("carrito", products);
				setOpen(true);
				setTimeout(() => {
					setOpen(false);
				}, 1000);
			};
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	function handleSize(e) {
		setSelectedSize(e.target.value);
	}

	function handleQuantity(e) {
		if (e.target.value !== "") {

			let val = parseInt(e.target.value);
			setQuantity(quantity + val);
		}
	}

	return (
		<>
			<span className="separator"></span>
			<div className="main-products">
				<main>
					<div className="products-title">
						<div className="line"></div>
						<h2>Productos</h2>
					</div>

					<div className="product-container">
						{productos.map((product) => (
							<div
								key={product._id}
								className="product-card"
								onClick={() => handleProductClick(product._id)}
							>
								<div className="img-container">
									<img src={product.images[0]} alt={product.name} />
								</div>
								<h3>{product.name}</h3>
								<p>{product.price}€</p>
								<div className="product-options">
									{product.sizes ? (
										<select
											name="size"
											id="size"
											onChange={handleSize}
											onClick={(e) => handleSelectSize(e)}
										>
											<option selected disabled>Talla</option>
											{product.sizes.map((size, i) => (
												<option key={i} value={size.size}>
													{size.size}
												</option>
											))}
										</select>
									) : (
										<select
											name="Unique"
											id="Unique"
											onChange={handleSize}
											onClick={(e) => handleSelectSize(e)}
										>
											<option value="Unique">U</option>
										</select>
									)}
									<input
										defaultValue="1"
										id="quantity"
										min="1"
										type="number"
										// onChange={(e) => handleQuantity(e)}
										onClick={(e) => handleSelectClick(e)}
									/>
									<IconButton onClick={(e) => handleAddToCart(e, product)}>
										<AddShoppingCartIcon fontSize={iconSize} />
									</IconButton>
								</div>
							</div>
						))}
					</div>
				</main>
			</div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box className="modal-cart">
					<CheckIcon className="check-icon" sx={{ fontSize: 90 }} />
					<h2 id="modal-modal-title" variant="h6" component="h2">
						Producto añadido al carrito.
					</h2>
				</Box>
			</Modal>
		</>
	);
};
