import Header from "../components/header";
import CatalogueFilmsServer from "../components/public/films/catalogue_film_server";

const FilmsPage = () => {
	return (
		<>
			<Header />
			<CatalogueFilmsServer />
		</>
	);
};

export default FilmsPage;
