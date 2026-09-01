import fs from "node:fs/promises";
import type { Express } from "express";
import { fileTypeFromFile } from "file-type";
import type { Multer } from "multer";

/*
 {
    fieldname: 'images',
    originalname: 'allison_dorothy.webp',
    encoding: '7bit',
    mimetype: 'image/webp',
    destination: 'public/img/book',
    filename: 'e17ab7d61a0467d96038d8f703afc69f',
    path: 'public/img/book/e17ab7d61a0467d96038d8f703afc69f',
    size: 28844
  }


*/

class FileServices {
	// renommer le fichier transférer avec la bonne extension
	// doit retourner le nom complet du fichier
	// on peut aussi filtrer le type de fichier, mettre une limite sur la taille des fichiers...
	public rename = async (file: Express.Multer.File): Promise<string> => {
		// ajouter l'extension du fichier et récupérer le nom complet
		const fullname = `${file.filename}.${(await fileTypeFromFile(file.path))?.ext}`;
		// console.log(fullname);

		// renommer le fichier avec le nom complet, avec l'ancien chemin (path) du fichier
		await fs.rename(file.path, `${file.destination}/${fullname}`);

		// retourner le nom complet
		return fullname;
	};
}

export default FileServices;
