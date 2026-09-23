import Header from "../components/header";
import CarrouselAccueil from "../components/public/carrousel_accueil";
import TextPresentation from "../components/texte_presentation";

const HomePage = () => {
	return (
		<>
			<Header variant="home" />
			<TextPresentation />
			<CarrouselAccueil />
		</>
	);
};

export default HomePage;
