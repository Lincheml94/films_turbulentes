import { type ZodError, z } from "zod";
import type { Film } from "../../models/film";

class AdminFilmFormValidator {
	// validation des données du formulaire
	public validate = async (
		data: Partial<Film>,
	): Promise<Partial<Film> | ZodError> => {
		// la méthode doit être exécutée côté serveur
		"use server";

		// Contraintes de validation
		const constraints = z.object({
			// ID : Optionnel (création) ou Nombre positif (mise à jour)
			id: z
				.union([z.string().nullable(), z.coerce.number().positive()])
				.optional(),

			// Titres et Textes obligatoires
			title: z
				.string("Le titre est obligatoire")
				.min(1, "Le titre ne peut pas être vide")
				.max(100, "Un titre doit comporter au maximum 100 caractères"),

			description: z
				.string("La description est obligatoire")
				.min(1, "La description ne peut pas être vide"),

			director_1: z
				.string("Le nom du réalisateur principal est obligatoire")
				.min(1, "Le nom ne peut pas être vide"),

			// Catégorie : Doit être un nombre positif (converti depuis la string du form)
			category_id: z.coerce
				.number({ message: "La catégorie doit être un nombre valide" })
				.positive("Veuillez sélectionner une catégorie valide"),

			release_date: z.coerce
				.number()
				.int("L'année doit être un nombre entier")
				.min(1888, "L'année doit être supérieure ou égale à 1888")
				.max(2100, "L'année doit être inférieure ou égale à 2100")
				.optional(),

			type: z.string().min(1, "Le type est obligatoire"),

			// Biographies et Textes longs (Optionnels)
			director_1_bio: z.string().optional(),
			director_2: z.string().optional(),
			director_2_bio: z.string().optional(),
			director_3: z.string().optional(),
			director_3_bio: z.string().optional(),

			fiche_technique: z.string().optional(),
			prix_festivals: z.string().optional(),
			partenaires_soutiens: z.string().optional(),
			presse: z.string().optional(),

			// Gestion des Images et Fichiers
			// Accepte : String (chemin existant), "DELETE" (instruction de suppression), null, ou un Objet File (upload)
			// Note: z.file() n'est pas natif dans toutes les versions de Zod sans config spécifique,
			// on utilise souvent z.any() ou z.instanceof(File) selon l'environnement.
			// Ici on reste large pour accepter le FormData.

			poster: z
				.union([
					z.string().nullable(), // Chemin existant ou null
					z.literal("DELETE"), // Instruction de suppression
					z.any(), // Fichier uploadé (File object)
				])
				.optional(),

			director_1_image: z
				.union([z.string().nullable(), z.literal("DELETE"), z.any()])
				.optional(),

			director_2_image: z
				.union([z.string().nullable(), z.literal("DELETE"), z.any()])
				.optional(),

			director_3_image: z
				.union([z.string().nullable(), z.literal("DELETE"), z.any()])
				.optional(),

			image_1: z
				.union([z.string().nullable(), z.literal("DELETE"), z.any()])
				.optional(),

			image_2: z
				.union([z.string().nullable(), z.literal("DELETE"), z.any()])
				.optional(),

			image_3: z
				.union([z.string().nullable(), z.literal("DELETE"), z.any()])
				.optional(),

			image_4: z
				.union([z.string().nullable(), z.literal("DELETE"), z.any()])
				.optional(),

			image_5: z
				.union([z.string().nullable(), z.literal("DELETE"), z.any()])
				.optional(),
		});

		// Validation de la saisie du formulaire
		const validation = await constraints.safeParseAsync(data);

		// Si la validation échoue
		if (!validation.success) {
			return validation.error;
		}

		// Si la validation réussit, on retourne les données validées
		return validation.data as Partial<Film>;
	};
}

export default AdminFilmFormValidator;
