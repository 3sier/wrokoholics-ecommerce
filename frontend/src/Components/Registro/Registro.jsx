import { useState } from "react";
import "./Registro.scss";
import { Link } from "react-router-dom";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

export default function Registro() {
	const Transition = React.forwardRef(function Transition(props, ref) {
		return <Slide direction="up" ref={ref} {...props} />;
	});

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [formData, setFormData] = useState({
		name: "",
		lastname: "",
		email: "",
		username: "",
		password: "",
		orders: [],
	});
	const [formErrors, setFormErrors] = useState({});

	const handleInput = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
		setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
	};

	const validateForm = () => {
		if (!formData.name) {
			return { name: "Por favor, introduce tu nombre." };
		}

		if (!formData.lastname) {
			return { lastname: "Por favor, introduce tu apellido." };
		}

		if (!formData.email) {
			return { email: "Por favor, introduce tu email." };
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			return { email: "El formato del email no es válido." };
		}

		if (!formData.username) {
			return { username: "Por favor, introduce tu nombre de usuario." };
		}

		if (!formData.password) {
			return { password: "Por favor, introduce tu contraseña." };
		} else if (formData.password.length < 6) {
			return { password: "La contraseña debe tener al menos 6 caracteres." };
		}

		return {};
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const errors = validateForm();
		setFormErrors(errors);
		if (Object.keys(errors).length === 0) {
			try {
				const response = await fetch(
					"http://localhost:3003/api/user/register",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(formData),
					}
				);
				if (!response.ok) {
					throw new Error("Error en la respuesta del servidor");
				}
				let data;
				try {
					data = await response.json();
				} catch (jsonError) {
					throw new Error("La respuesta del servidor no es un JSON válido");
				}
			} catch (error) {
				console.error("Error en la solicitud: " + error.message);
			}
		}
		setTimeout(() => {
			window.location.href = "/Login";
		}, 1000);
	};

	return (
		<>
			<React.Fragment>
				<div className="register-container">
					<div className="register-box">
						<form onSubmit={handleSubmit}>
							<h2>Únete a nosotros</h2>
							<div className="input-group">
								<input
									onChange={handleInput}
									type="text"
									name="name"
									placeholder="Nombre"
									value={formData.name}
									className={formErrors.name ? "input-error" : ""}
								/>
								{formErrors.name && (
									<p className="error-message">{formErrors.name}</p>
								)}

								<input
									onChange={handleInput}
									type="text"
									name="lastname"
									placeholder="Apellido"
									value={formData.lastname}
									className={formErrors.lastname ? "input-error" : ""}
								/>
								{formErrors.lastname && (
									<p className="error-message">{formErrors.lastname}</p>
								)}

								<input
									onChange={handleInput}
									type="text"
									name="email"
									placeholder="Email"
									value={formData.email}
									className={formErrors.email ? "input-error" : ""}
								/>
								{formErrors.email && (
									<p className={"error-message"}>{formErrors.email}</p>
								)}

								<input
									onChange={handleInput}
									type="text"
									name="username"
									placeholder="Nombre de usuario"
									value={formData.username}
									className={formErrors.username ? "input-error" : ""}
								/>
								{formErrors.username && (
									<p className="error-message">{formErrors.username}</p>
								)}

								<input
									onChange={handleInput}
									type="password"
									name="password"
									placeholder="Contraseña"
									value={formData.password}
									className={formErrors.password ? "input-error" : ""}
								/>
								{formErrors.password && (
									<p className="error-message">{formErrors.password}</p>
								)}

								<button type="submit" onClick={handleClickOpen}>
									Regístrate
								</button>
							</div>
							<div className="login-link">
								¿Ya tienes cuenta? <Link to={"/Login"}>Haz login</Link>
							</div>
						</form>
					</div>
				</div>
				<Dialog
					open={open}
					TransitionComponent={Transition}
					keepMounted
					onClose={handleClose}
					aria-describedby="alert-dialog-slide-description"
				>
					<DialogTitle>{"¡ENHORABUENA!"}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-slide-description">
							Te has registrado correctamente.
						</DialogContentText>
					</DialogContent>
				</Dialog>
			</React.Fragment>
		</>
	);
}
