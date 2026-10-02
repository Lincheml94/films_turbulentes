"use client";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import SecurityService from "../../service/security_service";

const Logout = () => {
	// useNavigate permet de créer une redirection
	const navigate = useNavigate();

	// supprimer à l'affichage du composant / page
	// useEffect : permet de déclencher à l'affichage
	useEffect(() => {
		// déconnexion
		new SecurityService().logout();
		// redirection vers la page de connexion
		// replace : remplace /logout dans l'historique, pour que le bouton "retour" ne repasse pas par la déconnexion
		navigate("/login", { replace: true });
	}, [navigate]);

	return <> </>;
};

export default Logout;
