import type { Dispatch, SetStateAction } from "react";
import type { Category } from "../../../models/category";
import type { Film } from "../../../models/film";

type FilterCategoriesProps = {
	categories: Category[];
	films: Film[];
	setselectedCategory: Dispatch<SetStateAction<string>>;
	setselectedFilms: Dispatch<SetStateAction<string>>;
	selectedCategory: string;
	selectedFilms: string;
};

export type { FilterCategoriesProps };
