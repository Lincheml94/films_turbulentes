import type { SeoProps } from "./seo_props";

// récupérer les props dans les paramètres de la fonction du composant
const Seo = ({ title, description, url }: SeoProps) => {
	return (
		<>
			{/* 50 caractères max */}
			<title>{`Les films des Turbulentes - ${title}`}</title>

			{/* 150 caractères max */}
			<meta
				name="description"
				content={`Les Films des Turbulentes - ${description}`}
			/>

			{/* Open Graph */}
			<meta
				property="og:title"
				content={`Les Films des Turbulentes - ${title}`}
			/>
			<meta property="og:type" content="website" />
			<meta
				property="og:url"
				content={`https://filmsdesturbulentes.com${url}`}
			/>

			{/* image: 1200x630px */}
			<meta
				property="og:image"
				content="https://filmsdesturbulentes.com/img/og_banner.jpg"
			/>
			<meta
				property="og:description"
				content={`Les Films des Turbulentes - ${description}`}
			/>

			{/* twitter cards */}
			<meta name="twitter:card" content="summary" />
			<meta
				name="twitter:title"
				content={`Les Films des Turbulentes - ${title}`}
			/>
			<meta
				name="twitter:description"
				content={`Les Films des Turbulentes - ${description}`}
			/>
			{/* image carrée */}
			<meta
				name="twitter:image"
				content="https://filmsdesturbulentes/img/logo/LFDT_ecusson_noir.png"
			/>
		</>
	);
};

export default Seo;
