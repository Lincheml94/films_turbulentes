import type { QueryResult } from "mysql2";
import type { Film } from "../../models/film";
import MySQLService from "../service/mysql_service";

class FilmRepository {
	private table: string = "film";

	public selectAll = async (): Promise<Film[] | unknown> => {
		// connexion au serveur MySQL
		const connection = await new MySQLService().connect();

		// requête SQL
		// SELECT category.* FROM publishinghouse_dev.category
		const sql = `
            SELECT ${this.table}.*, 
			category.name AS category_name
            FROM ${process.env.MYSQL_DATABASE}.${this.table}
			JOIN ${process.env.MYSQL_DATABASE}.category 
			ON ${this.table}.category_id = category.id;
        `;
		// try / catch : récupérer les résultats de la requête ou une erreur
		try {
			// execution de la requête
			const [query] = await connection.execute(sql);

			// for (let i = 0; i < (query as Film[]).length; i++) {
			// 	const result = (query as Film[])[i] as Film;
			// 	result.category = (await new CategoryRepository().selectOne({
			// 		id: result.category_id,
			// 	})) as Category;
			// }
			return query;
		} catch (error) {
			return error;
		}
	};

	public selectOne = async (data: Partial<Film>): Promise<Film | unknown> => {
		// connexion au serveur MySQL
		const connection = await new MySQLService().connect();

		// requête SQL
		// WHERE category.id = ... variable de requête : précédée d'un :, suivi du nom de la variable
		const sql = `
	        SELECT ${this.table}.*, category.name AS category_name
	        FROM ${process.env.MYSQL_DATABASE}.${this.table}
			JOIN ${process.env.MYSQL_DATABASE}.category 
			ON ${this.table}.category_id = category.id
			WHERE ${this.table}.id = :id
			;
	    `;
		// try / catch : récupérer les résultats de la requête ou une erreur
		try {
			const [query] = await connection.execute(sql, data);
			const result = (query as Film[]).shift();

			// result.category = (await new CategoryRepository().selectOne({
			// 	id: result.category_id,
			// })) as Category;

			// retourner les résultats
			return result;
		} catch (error) {
			return error;
		}
	};

	public findLatestExploitedFilms = async (
		limit: number = 3,
	): Promise<Film[] | unknown> => {
		// Connexion au serveur MySQL
		const connection = await new MySQLService().connect();

		// Requête SQL
		// On sélectionne les films, on joint la table category pour filtrer par nom,
		// on filtre sur 'En exploitation', on trie par date (ou ID) décroissante, et on limite le résultat.
		const sql = `
        SELECT ${this.table}.*, 
               category.name AS category_name
        FROM ${process.env.MYSQL_DATABASE}.${this.table}
        JOIN ${process.env.MYSQL_DATABASE}.category 
        ON ${this.table}.category_id = category.id
        WHERE category.name = 'En exploitation'
        ORDER BY ${this.table}.release_date DESC
        LIMIT ?;
    `;

		// Try / Catch : exécuter la requête avec le paramètre limit ou retourner une erreur
		try {
			// Execution de la requête avec le tableau de paramètres [limit]
			const [query] = await connection.execute(sql, [limit]);

			return query;
		} catch (error) {
			return error;
		}
	};

	public insert = async (
		data: Partial<Film>,
	): Promise<QueryResult | unknown> => {
		const connection = await new MySQLService().connect();
		const sql = `
		INSERT INTO 
			${process.env.MYSQL_DATABASE}.${this.table}
		VALUES 
			(
				NULL, 

				:title, 
				:poster,
				:director_1, 
				:director_1_bio,
				:director_1_image,
				:director_2,
				:director_2_bio,
				:director_2_image,
				:director_3,
				:director_3_bio,
				:director_3_image,
				:description, 
				:type,  
				:release_date,
				:duration,
				:fiche_technique,
				:prix_festivals,
				:partenaires_soutiens,
				:presse,
				:category_id,
				:image_1,
				:image_2,
				:image_3,
				:image_4,
				:image_5
			)
			;
		`;

		try {
			const [query] = await connection.execute(sql, data);

			// retourner les résultats
			return query;
		} catch (error) {
			connection.rollback();
			return error;
		}
	};

	public update = async (
		data: Partial<Film>,
	): Promise<QueryResult | unknown> => {
		const connection = await new MySQLService().connect();
		const sql = `
		UPDATE 
			${process.env.MYSQL_DATABASE}.${this.table}
		SET 
			${this.table}.title = :title,
			${this.table}.poster = :poster,
			${this.table}.director_1 = :director_1,
			${this.table}.director_1_bio = :director_1_bio,
			${this.table}.director_1_image = :director_1_image,
			${this.table}.director_2 = :director_2,
			${this.table}.director_2_bio = :director_2_bio,
			${this.table}.director_2_image = :director_2_image,
			${this.table}.director_3 = :director_3,
			${this.table}.director_3_bio = :director_3_bio,
			${this.table}.director_3_image = :director_3_image,
			${this.table}.description = :description,
			${this.table}.type = :type,
			${this.table}.release_date = :release_date,
			${this.table}.duration = :duration,
			${this.table}.fiche_technique = :fiche_technique,
			${this.table}.prix_festivals = :prix_festivals,
			${this.table}.partenaires_soutiens = :partenaires_soutiens,
			${this.table}.presse = :presse,
			${this.table}.category_id = :category_id,
			${this.table}.image_1 = :image_1,
			${this.table}.image_2 = :image_2,
			${this.table}.image_3 = :image_3,
			${this.table}.image_4 = :image_4,
			${this.table}.image_5 = :image_5
		WHERE 
			${this.table}.id = :id
			;
		`;

		try {
			const [query] = await connection.execute(sql, data);

			// retourner les résultats
			return query;
		} catch (error) {
			connection.rollback();
			return error;
		}
	};

	public delete = async (
		data: Partial<Film>,
	): Promise<QueryResult | unknown> => {
		const connection = await new MySQLService().connect();
		const sql = `
		DELETE FROM 
			${process.env.MYSQL_DATABASE}.${this.table}
		WHERE 
			${this.table}.id = :id
			;
		`;

		try {
			const [query] = await connection.execute(sql, data);

			// retourner les résultats
			return query;
		} catch (error) {
			connection.rollback();
			return error;
		}
	};
}
export default FilmRepository;
