import type { Category } from "./category";

type Film = {
	id: number;

	title: string;
	poster: string;
	director: string;
	description: string;
	release_date: number | null;
	fiche_technique: string | null;
	prix_festivals: string | null;
	production_soutien: string | null;
	category_id: number;
	category: Category;
	image_1: string | null;
	image_2: string | null;
	image_3: string | null;
	image_4: string | null;
	image_5: string | null;
};

export type { Film };
