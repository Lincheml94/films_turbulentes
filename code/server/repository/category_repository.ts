import type { Category } from "../../models/category";
import type { Film } from "../../models/film";
import MySQLService from "../service/mysql_service";
import FilmRepository from "./film_repository";

class CategoryRepository {
	private table: string = "category";

	public selectAll = async (): Promise<Category[] | unknown> => {
		// connexion au serveur MySQL
		const connection = await new MySQLService().connect();

		// requête SQL
		// SELECT category.* FROM publishinghouse_dev.category
		const sql = `
            SELECT ${this.table}.*
            FROM ${process.env.MYSQL_DATABASE}.${this.table}
			
        `;
		// try / catch : récupérer les résultats de la requête ou une erreur
		try {
			// execution de la requête
			const [query] = await connection.execute(sql);
			return query;
		} catch (error) {
			return error;
		}
	};

	public selectOne = async (
		data: Partial<Category>,
	): Promise<Category | unknown> => {
		// connexion au serveur MySQL
		const connection = await new MySQLService().connect();

		// requête SQL
		// WHERE category.id = ... variable de requête : précédée d'un :, suivi du nom de la variable
		const sql = `
            SELECT ${this.table}.*, film.id AS film_id, film.title AS film_title
            FROM ${process.env.MYSQL_DATABASE}.${this.table}
			LEFT JOIN film ON film.category_id = ${this.table}.id
			WHERE ${this.table}.id = :id
			;
        `;

		try {
			const [rows] = await connection.execute(sql, data);
			const dataRows = rows as any[];

			if (dataRows.length === 0) return null;

			// 2. On crée l'objet catégorie avec la première ligne
			const category: Category = {
				id: dataRows[0].cat_id,
				name: dataRows[0].cat_name,
				films: [],
			};

			// 3. La boucle simple et lisible (forEach)
			// On vérifie row.film_id pour éviter d'ajouter un film "null" si la catégorie est vide
			dataRows.forEach((row) => {
				if (row.film_id) {
					category.films.push({
						id: row.film_id,
						title: row.film_title,
						poster: row.film_poster,
						category_id: category.id,
						// Les autres champs (bio, fiche technique...) restent undefined/non remplis
						// car inutiles pour une liste de catalogue.
					} as Film);
				}
			});

			return category;

			// try / catch : récupérer les résultats de la requête ou une erreur

			// try {
			// 	// execution de la requête
			// 	// Si la requête possède des variables, utiliser les paramètres de la méthode (ici: data)
			// 	// requêtes préparées (utilisations des variables de requêtes) : ça sert à améliorer la sécurité, le système va évaluer la sécurité de la requête
			// 	// la requête est exécutée uniquement si elle ne présente pas de risque
			// 	const [query] = await connection.execute(sql, data);

			// 	// récupérer le premier indice d'un tableau
			// 	// as permet de "transtyper". Dire que query est un tableau
			// 	// shift : récupérer le premier indice d'un array
			// 	const result = (query as Category[]).shift() as Category;

			// 	// result.films = (await new FilmRepository().selectAll(
			// 	// 	result.film_ids,
			// 	// )) as Film[];

			// 	// retourner les résultats
			// 	return result;
		} catch (error) {
			return error;
		}
	};
}
export default CategoryRepository;
