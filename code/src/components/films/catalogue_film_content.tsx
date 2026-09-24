import { use } from "react";
import FilmApiService from "../../service/film_api_service";

const CatalogueFilmContent = () => {
	const results = use(new FilmApiService().selectAll()).data;

	return (
		<div>
			<p>hello</p>
			<p>hello</p>
			<p>hello</p>
			<p>hello</p>
			<p>hello</p>
			<p>hello</p>
			<p>hello</p>
			<p>hello</p>
			<p>hello</p>
			<p>hello</p>
			<p>hello</p>
			<p>hello</p>
			<p>hello</p>

			{results?.map((item) => {
				return (
					<div key={item.id}>
						<img src={`/img/${item.poster}`} alt={item.title} />
						<p>{item.title}</p>
					</div>
				);
			})}
		</div>
	);
};

export default CatalogueFilmContent;
