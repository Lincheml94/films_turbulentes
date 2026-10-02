"use client";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import type { GuardProps } from "../../models/props/guard_props";
import SecurityService from "../../service/security_service";

const Guard = ({ roles, children }: GuardProps) => {
	const navigate = useNavigate();

	useEffect(() => {
		const checkUser = async () => {
			// chercher l'utilisateur connecté
			const user = await new SecurityService().getUser();
			console.log("Guard : utilisateur =", user);
			// pas d'utilisateur, ou rôle non autorisé : retour à la connexion
			if (!user || roles.indexOf(user.role as string) === -1) {
				navigate("/login", { replace: true });
			}
		};
		checkUser();
	}, [roles, navigate]);

	return <>{children}</>;
};

export default Guard;
