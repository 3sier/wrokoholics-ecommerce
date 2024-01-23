import Button from "@mui/material/Button";
import "./landing.scss";
import { Link } from "react-router-dom";
import Productos from "../Productos/Productos";
import Producto from "../Producto/Producto";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useEffect, useState } from "react";

export default function Landing() {
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 738);

	const desktopImages = [
		"https://i.ibb.co/RcfjwJF/Group-47.png",
		"https://i.ibb.co/hfRNDX4/Group-49-1.png",
	];

	const mobileImages = [
		"https://i.ibb.co/qmNTXj3/Group-50.png",
		"https://i.ibb.co/hCjZXQW/Group-49-2.png",
	];

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 738);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const images = isMobile ? mobileImages : desktopImages;
	return (
		<>
			<div className="main-container">
				<span className="separator"></span>
				<main>
					<section className="section-header">
						<Slide key={isMobile ? "mobile" : "desktop"} vertical={isMobile}>
							<div className="each-slide-effect">
								<div style={{ backgroundImage: `url(${images[0]})` }}>
									<Link to="/Productos" component={Productos}>
										<button className="landing-btn-prod">Ir a productos</button>
									</Link>
								</div>
							</div>
							<div className="each-slide-effect">
								<div style={{ backgroundImage: `url(${images[1]})` }}>
									<Link to="/Registro" component={Productos}>
										<button className="landing-btn-reg">Registrate</button>
									</Link>
								</div>
							</div>
						</Slide>
					</section>
					<section className="section-products">
						<div className="higlight-title">
							<div className="line"></div>
							<h2 className="sub-title">Producto destacado</h2>
						</div>

						<div className="product-item">
							<div className="product-img-container">
								<img
									alt="Cuadernos"
									className="product-image"
									src="https://i.ibb.co/k3Bw3CL/IMG-4443.png"
								/>
							</div>
							<div className="info-container">
								<h3 className="product-name">Cuardeno</h3>
								<p className="product-description">
									El cuaderno ideal para bocetar tus ideas
								</p>
								<Link
									to="/Producto/6576d09ffbf8dc6553964c87"
									component={Producto}
								>
									<Button className="product-button">MAS INFO</Button>
								</Link>
							</div>
						</div>
					</section>
				</main>
			</div>
		</>
	);
}
