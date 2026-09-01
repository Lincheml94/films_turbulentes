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
				:director, 
				:description, 
				:release_date,
				:fiche_technique,
				:prix_festivals,
				:production_soutien,
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
			${this.table}.director = :director,
			${this.table}.description = :description,
			${this.table}.release_date = :release_date,
			${this.table}.fiche_technique = :fiche_technique,
			${this.table}.prix_festivals = :prix_festivals,
			${this.table}.production_soutien = :production_soutien,
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
