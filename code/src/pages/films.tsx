import CatalogueFilmContent from "../components/films/catalogue_film_content_client";
import CatalogueFilmsServer from "../components/films/catalogue_film_server";
import Header from "../components/header";

const FilmsPage = () => {
	return (
		<>
			<Header />
			<CatalogueFilmsServer />
		</>
	);
};

export default FilmsPage;
