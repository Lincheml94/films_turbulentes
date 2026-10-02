"use client";
import type React from "react";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type { User } from "../../../models/user";
import SecurityApiService from "../../service/security_api_service";
import SecurityService from "../../service/security_service";

const FormulaireLogin = (): React.JSX.Element => {
	const userNameId = useId();
	const passwordId = useId();

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Partial<User>>();

	const submitForm = async (data: Partial<User>) => {
		// console.log(data);
		const process = await new SecurityApiService().login(data);

		// si la requête HTTP a réussie

		if ([200, 201].indexOf(process.status) !== -1) {
			// récupérer l'utilisateur
			const user = process.data as User;

			// stocker l'utilisateur
			new SecurityService().setUser(user);
			// stocker le token JWT
			await new SecurityService().setToken(user);

			navigate("/admin");
		}
	};

	return (
		<form onSubmit={handleSubmit(submitForm)}>
			<h2>Se connecter</h2>
			<label htmlFor={userNameId}>username</label>
			<input
				type="text"
				id={userNameId}
				{...register("username", {
					required: "Le username est obligatoire",
					maxLength: {
						value: 100,
						message: "un username doit comporter au minimum 1 caractère",
					},
				})}
			/>

			<label htmlFor={passwordId}>mot de passe</label>
			<input
				type="password"
				id={passwordId}
				{...register("password", {
					required: "Le mot de passe est obligatoire",
					maxLength: {
						value: 100,
						message: "un username doit comporter au minimum 5 caractères",
					},
				})}
			/>

			<button type="submit">se connecter</button>
		</form>
	);
};

export default FormulaireLogin;
