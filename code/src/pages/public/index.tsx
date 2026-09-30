import Header from "../../components/header";
import CarrouselAccueilServer from "../../components/public/carrousel/carrousel_accueil_server";
import TextPresentation from "../../components/texte_presentation";

const HomePage = () => {
	return (
		<>
			<Header variant="home" />
			<TextPresentation />
			<CarrouselAccueilServer />
		</>
	);
};

export default HomePage;
