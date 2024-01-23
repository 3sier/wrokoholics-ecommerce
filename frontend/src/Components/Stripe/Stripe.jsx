import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Stripe.scss";

const Checkout = () => {
	let precioFinal = localStorage.getItem("totalcompra");
	const [cardDetails, setCardDetails] = useState({
		number: "",
		expMonth: "",
		expYear: "",
		cvc: "",
		nameOnCard: "",
	});
	const [isProcessingPayment, setProcessingPayment] = useState(false);
	const [card, setCard] = useState("");

	const navigate = useNavigate();

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setCardDetails({ ...cardDetails, [name]: value });
	};

	const handleCardDisplay = () => {
		const rawText = [...card.split(" ").join("")];
		const creditCard = [];
		rawText.forEach((t, i) => {
			if (i % 4 === 0 && i !== 0) creditCard.push(" ");
			creditCard.push(t);
		});
		return creditCard.join("");
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (card !== "1234 1234 1234 1234") {
			setProcessingPayment(true);
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setProcessingPayment(false);

			navigate("/cancel");
		} else {
			setProcessingPayment(true);
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setProcessingPayment(false);
			navigate("/completed");
		}
	};

	return (
		<>
			<span className="separator"></span>
			<div
				className={`checkout-container ${isProcessingPayment ? "hidden" : ""}`}
			>
				{!isProcessingPayment && (
					<>
						<div className="card-box">
							<div className="card-icon">
								{/* Muestra el número de la tarjeta y el nombre del titular aquí */}
								<span className="card-number">{handleCardDisplay()}</span>
								<span className="card-name">{cardDetails.nameOnCard}</span>
								{/* Muestra Mes, Año, y CVC aquí */}
								<div className="card-details">
									<span className="card-date">
										{cardDetails.expMonth} {cardDetails.expYear}
									</span>
									<span className="card-cvc">{cardDetails.cvc}</span>
								</div>
							</div>
						</div>
						<div className="total-price">
							<h3>Total: {precioFinal}€</h3>
						</div>
						<div className="checkout-box">
							<form onSubmit={handleSubmit}>
								<label className="label-big">Numero</label>
								<input
									type="text"
									value={handleCardDisplay()}
									onChange={(e) => setCard(e.target.value)}
									name="number"
									placeholder="1234 1234 1234 1234"
									className="big"
								/>

								<label className="label-big">Titular</label>
								<input
									type="text"
									value={cardDetails.nameOnCard}
									onChange={handleInputChange}
									name="nameOnCard"
									placeholder="Nombre en la tarjeta"
									className="big"
								/>

								<label className="label-small">Mes</label>
								<label className="label-small">Año</label>
								<label className="label-small">CVC</label>
								<input
									type="number"
									value={cardDetails.expMonth}
									onChange={handleInputChange}
									name="expMonth"
									placeholder="MM"
									className="small"
								/>

								<input
									type="number"
									value={cardDetails.expYear}
									onChange={handleInputChange}
									name="expYear"
									placeholder="YY"
									className="small"
								/>

								<input
									type="number"
									value={cardDetails.cvc}
									onChange={handleInputChange}
									name="cvc"
									placeholder="CVC"
									className="small"
								/>

								<button type="submit" className="pay-button">
									Pagar
								</button>
							</form>
						</div>
					</>
				)}
			</div>

			{isProcessingPayment && <div className="loader"></div>}
		</>
	);
};

export default Checkout;
