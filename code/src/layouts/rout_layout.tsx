import { Outlet } from "react-router";

const RootLayout = () => {
	return (
		<html lang="fr">
			<head>
				<meta charSet="UTF-8" />
				<link rel="icon" type="image/svg+xml" href="" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Les Films des Turbulentes</title>
			</head>

			<body>
				{/* outlet : zone vide qui va être remplie par un autre contenu */}
				<Outlet />
			</body>
		</html>
	);
};

export default RootLayout;
