import { Link } from "react-router";
import styles from "../../assets/css/public/contact.module.css";

const ContactContent = () => {
	return (
		<div className={styles.contactContent}>
			<div className={styles.contactBox}>
				{/* <h1>LES FILMS DES TURBULENTES</h1> */}
				<div className={styles.contactDetails}>
					<img
						src="/img/icons/location.svg"
						alt="location"
						className={styles.imgLocation}
					/>
					<div>
						<p>
							Siège :
							<br />
							585 rue du Bourg, 28260 Guainville
							<br />
							<br />
						</p>
						<p>
							Adresse postale :
							<br />
							49 boulevard Preuilly, 37000 Tours
						</p>
					</div>
				</div>
				<div className={`${styles.contactDetails} ${styles.otherDetails}`}>
					<img src="/img/icons/mail.svg" alt="e-mail" />
					<Link to="mailto:exemple@email.com" target="blank">
						<p>contact@filmsdesturbulentes.com</p>
					</Link>
				</div>
				<div className={`${styles.contactDetails} ${styles.otherDetails}`}>
					<img src="/img/icons/insta.svg" alt="instagram" />
					<Link
						to="https://www.instagram.com/lesfilmsdesturbulentes/"
						target="blank"
					>
						<p>@lesfilmsdesturbulentes</p>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default ContactContent;
