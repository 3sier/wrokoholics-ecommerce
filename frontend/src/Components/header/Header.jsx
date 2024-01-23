import workoLogo from "../../images/Logo-Worköholics.png";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Header.scss";
import { useState } from "react";
import { useUser } from "../UserContex";
import { Link } from "react-router-dom";
import "animate.css";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Header() {
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
	const isMobile = useMediaQuery("(max-width: 768px)");
	const { loginUser, setLoginUser } = useUser();
	const navigate = useNavigate();

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!isMobileMenuOpen);
	};

	const handleUserButtonClick = () => {
		if (isMobileMenuOpen) {
			setMobileMenuOpen(false);
		}
	};

	const handleLogout = () => {
		try {
			localStorage.removeItem("user");
			localStorage.clear();

			setLoginUser(null);

			if (isMobileMenuOpen) {
				setMobileMenuOpen(false);
			}

			navigate("/");
		} catch (error) {}
	};

	const iconSize = isMobile ? "small" : "large";

	return (
		<>
			<header>
				<div className="logo">
					<Link to={"/"} onClick={handleUserButtonClick}>
						<img src={workoLogo} alt="Workoholics" />
					</Link>
				</div>

				{/* Conditional rendering for logout button */}
				<nav className="desktop-nav">
					<ul>
						<li>
							<Link to={"/Productos"}>Productos</Link>
						</li>
						<li>
							<Link>Novedades</Link>
						</li>
						<li>
							<Link>About</Link>
						</li>
					</ul>
				</nav>
				<div className="menu-icons">
					<Link to={"/Carrito"} onClick={handleUserButtonClick}>
						<IconButton className="cart">
							<ShoppingBasketOutlinedIcon fontSize={iconSize} />
						</IconButton>
					</Link>
					<Link
						to={loginUser ? "/Usuario" : "/Login"}
						onClick={handleUserButtonClick}
					>
						<IconButton className="user">
							<PersonIcon
								fontSize={iconSize}
								className={loginUser ? "icon-user-logged-in" : ""}
							/>
						</IconButton>
					</Link>
					{loginUser && (
						<IconButton className="log-out">
							<LogoutIcon onClick={handleLogout} fontSize={iconSize} />
						</IconButton>
					)}
				</div>

				<div className="mobile-nav">
					{!isMobileMenuOpen && (
						<IconButton className="burger-menu" onClick={toggleMobileMenu}>
							<MenuIcon />
						</IconButton>
					)}
					{isMobileMenuOpen && (
						<IconButton className="close-menu" onClick={toggleMobileMenu}>
							<CloseIcon />
						</IconButton>
					)}

					{isMobileMenuOpen && (
						<div className="mobile-menu animate__animated animate__fadeInRightBig">
							<div className="menu-list animate__animated animate__slideInRight animate__delay-1s">
								<ul>
									<li>
										<Link to={"/Productos"} onClick={toggleMobileMenu}>
											Productos
										</Link>
									</li>
									<li>
										<Link>Novedades</Link>
									</li>
									<li>
										<Link>About</Link>
									</li>
								</ul>
							</div>
						</div>
					)}
				</div>
			</header>
		</>
	);
}
