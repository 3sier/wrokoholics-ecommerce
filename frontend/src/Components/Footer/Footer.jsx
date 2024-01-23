import "./Footer.scss";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

export default function Footer() {
	return (
		<>
			<footer>
				<div className="redes">
					<a target="_blank" href="https://twitter.com/workoholics_">
						Twitter <ArrowOutwardIcon className="arrow-ico" />
					</a>
					<a
						target="_blank"
						href="https://www.linkedin.com/company/workoholics/"
					>
						LinkedIn <ArrowOutwardIcon />
					</a>
					<a target="_blank" href="https://www.instagram.com/workoholics_">
						Instagram <ArrowOutwardIcon />
					</a>
					<a target="_blank" href="https://workoholics.es/">
						web <ArrowOutwardIcon />
					</a>
				</div>

				<div className="contact">
					<a target="_blank" href="mailto:hello@workoholics.es">
						hello@workoholics.es
					</a>
					<a target="_blank" href="tel:944059957">
						+34 944 059 957
					</a>
				</div>
			</footer>
		</>
	);
}
