import type { unstable_RSCRouteConfig as RSCRouteConfig } from "react-router";

class RouterService {
	public GetRouter = () => {
		return [
			{
				// identifiant unique de la mise en page
				id: "root",
				// préfixe des routes
				path: "",
				// importation de la mise en page parente
				lazy: () => import("../layouts/rout_layout"),

				children: [
					// // PUBLIC
					{
						id: "public",
						path: "",
						lazy: () => import("../layouts/public_layout"),

						children: [
							{
								id: "home",
								path: "",
								lazy: () => import("../pages/public/index"),
							},
							{
								id: "films",
								path: "/films",
								lazy: () => import("../pages/public/films"),
							},
							{
								id: "film_detail",
								path: "/films/:id",
								lazy: () => import("../pages/public/page_film_detail"),
							},
							{
								id: "login",
								path: "/login",
								lazy: () => import("../pages/admin/login"),
							},
						],
					},
					// ADMIN
					{
						id: "admin",
						path: "admin",
						lazy: () => import("../layouts/admin_layout"),

						children: [
							{
								id: "dashboard",
								path: "",
								index: true,
								lazy: () => import("../pages/admin/index"),
							},
							{
								id: "film_form",
								path: "film_form/:id?",
								lazy: () => import("../pages/admin/film_form"),
							},
							{
								id: "film_delete",
								path: "film_delete/:id",
								lazy: () => import("../pages/admin/film_delete"),
							},
						],
					},
				],
			},
		] satisfies RSCRouteConfig;
	};
}

export default RouterService;
