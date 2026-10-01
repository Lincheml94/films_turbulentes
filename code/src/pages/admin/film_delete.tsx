"use client";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import type { AdminFilmParams } from "../../models/params/admin_film_params";
import FilmApiService from "../../service/film_api_service";

const AdminFilmDelete = ({ params }: AdminFilmParams) => {
	const { id } = params;

	// useNavigate permet de créer une redirection
	const navigate = useNavigate();
	// Pré remplir le formulaire avant l'affichage du composant
	useEffect(() => {
		new FilmApiService().delete({ id: id }).then(() => {
			navigate("/admin");
			return;
		});
	}, [id, navigate]);

	return (
		<>
			<title>Gestion de Film</title>
		</>
	);
};

export default AdminFilmDelete;
