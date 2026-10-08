import Header from "../../components/header";
import APropos from "../../components/public/a_propos";
import Seo from "../../models/props/seo/seo";

const PageApropos = () => {
	return (
		<>
			<Seo
				title="A propos"
				description="A propos de la société de production Les Films des Turbulentes"
				url="/a_propos"
			/>
			<Header variant="film_detail" />
			<APropos />
		</>
	);
};

export default PageApropos;
