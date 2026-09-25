import type { FilmContentDetailsProps } from "../../models/props/films/films_content_details_props";

const FilmContentDetailsClient = ({ data }: FilmContentDetailsProps) => {
	return (
		<div>
			<img src={`/img/${data.poster}`} alt={data.title} />
		</div>
	);
};
export default FilmContentDetailsClient;
