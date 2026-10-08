import Header from "../../components/header";
import CatalogueFilmsServer from "../../components/public/films/catalogue_film_server";
import Seo from "../../models/props/seo/seo";

const FilmsPage = () => {
	return (
		<>
			<Seo
				title="Films"
				description="Catalogue des films produit par Les Films des Turbulentes"
				url="films"
			/>
			<Header />
			<CatalogueFilmsServer />
		</>
	);
};

export default FilmsPage;
