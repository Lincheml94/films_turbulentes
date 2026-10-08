import Header from "../../components/header";
import CarrouselAccueilServer from "../../components/public/carrousel/carrousel_accueil_server";
import TextPresentation from "../../components/texte_presentation";
import Seo from "../../models/props/seo/seo";

const HomePage = () => {
	return (
		<>
			<Seo
				title="Accueil"
				description="Bienvenue sur la page d'accueil des Films des Turbulentes"
				url="/"
			/>
			<Header variant="home" />
			<TextPresentation />
			<CarrouselAccueilServer />
		</>
	);
};

export default HomePage;
