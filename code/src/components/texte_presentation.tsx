import styles from "../assets/css/public/header.module.css";

const TextPresentation = () => {
	return (
		<div className={styles.infoTexte}>
			<p>
				Nous accompagnons des cinéastes soucieux du monde qui les entourent,
				dont les regards nous touchent, en veillant tout particulièrement à la
				rencontre de leurs films avec les publics.
				<br />
				Nous sommes attachées aux projets qui prennent des chemins de traverse,
				expérimentent avec les formes et déplacent les certitudes.
			</p>
		</div>
	);
};

export default TextPresentation;
