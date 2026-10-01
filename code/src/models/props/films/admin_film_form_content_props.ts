// import type { ZodError } from "zod";
import type { ZodError } from "zod";
import type { Category } from "../../../../models/category";
import type { Film } from "../../../../models/film";

type AdminFilmFormContentProps = {
	categories: Category[];
	validator: (data: Partial<Film>) => Promise<Partial<Film> | ZodError>;
	dataToUpdate: Film | undefined;
};

export type { AdminFilmFormContentProps };
