import Header from "../../components/header";
import ContactContent from "../../components/public/contact";
import Seo from "../../models/props/seo/seo";

const PageContact = () => {
	return (
		<>
			<Seo
				title="Contact"
				description="Informations pour contacter la société de production Les Films des Turbulentes"
				url="/contact"
			/>
			<Header />
			<ContactContent />;
		</>
	);
};

export default PageContact;
