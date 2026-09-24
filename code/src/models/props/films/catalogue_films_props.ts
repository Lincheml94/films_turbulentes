import type { Category } from "../../../../models/category";
import type { Film } from "../../../../models/film";

type CatalogueFilmsProps = {
	films: Film[];
	categories: Category[];
};

export type { CatalogueFilmsProps };
