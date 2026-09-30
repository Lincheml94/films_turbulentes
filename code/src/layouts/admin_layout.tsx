import { Outlet } from "react-router";

const AdminLayout = () => {
	return (
		<h1>
			Bienvenue sur l'espace d'administration du site des Films des Turbulentes
			<Outlet />
		</h1>
	);
};

export default AdminLayout;
