import type { Film } from "./film";

type Category = {
	id: number;
	name: string;
	film_ids?: string | null;
	films: Film[];
};

export type { Category };
