import type { Category } from "../../../../models/category";
import type { Film } from "../../../../models/film";

export interface CatalogueFilmContentClientProps {
	initialFilms: Film[];
	initialCategories: Category[];
}
