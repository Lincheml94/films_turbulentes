import type { Category } from "../../models/category";
import MySQLService from "../service/mysql_service";

class CategoryRepository {
	private table: string = "category";

	public selectAll = async (): Promise<Category[] | unknown> => {
		// connexion au serveur MySQL
		const connection = await new MySQLService().connect();

		// requête SQL
		// SELECT category.* FROM publishinghouse_dev.category
		const sql = `
            SELECT ${this.table}.*, film.director AS film_director
            FROM ${process.env.MYSQL_DATABASE}.${this.table}
			JOIN film ON film.category_id = film.id;
			
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
            SELECT ${this.table}.*, film.director AS film_director
            FROM ${process.env.MYSQL_DATABASE}.${this.table}
			JOIN film ON film.category_id = film.id
			WHERE ${this.table}.id = :id
			;
        `;
		// try / catch : récupérer les résultats de la requête ou une erreur
		try {
			// execution de la requête
			// Si la requête possède des variables, utiliser les paramètres de la méthode (ici: data)
			// requêtes préparées (utilisations des variables de requêtes) : ça sert à améliorer la sécurité, le système va évaluer la sécurité de la requête
			// la requête est exécutée uniquement si elle ne présente pas de risque
			const [query] = await connection.execute(sql, data);

			// récupérer le premier indice d'un tableau
			// as permet de "transtyper". Dire que query est un tableau
			// shift : récupérer le premier indice d'un array
			const result = (query as Category[]).shift();

			// retourner les résultats
			return result;
		} catch (error) {
			return error;
		}
	};
}
export default CategoryRepository;
