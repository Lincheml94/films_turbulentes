import type { Category } from "./category";

type Film = {
	id: number;
	title: string;
	poster: string;
	director_1: string;
	director_1_bio: string | null;
	director_1_image: string | null;
	director_2: string | null;
	director_2_bio: string | null;
	director_2_image: string | null;
	director_3: string | null;
	director_3_bio: string | null;
	director_3_image: string | null;
	description: string;
	type: string;
	release_date: number | null;
	duration: number | null;
	fiche_technique: string | null;
	prix_festivals: string | null;
	partenaires_soutiens: string | null;
	presse: string | null;
	category_id: number;
	category: Category;
	image_1: string | null;
	image_2: string | null;
	image_3: string | null;
	image_4: string | null;
	image_5: string | null;
};

export type { Film };
