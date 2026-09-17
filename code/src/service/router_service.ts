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
					// // ADMIN
					// {},
					// // PUBLIC
					{
						id: "public",
						path: "",
						lazy: () => import("../layouts/public_layout"),

						children: [
							{
								id: "home",
								path: "",
								lazy: () => import("../pages/index"),
							},
						],
					},
				],
			},
		] satisfies RSCRouteConfig;
	};
}

export default RouterService;
