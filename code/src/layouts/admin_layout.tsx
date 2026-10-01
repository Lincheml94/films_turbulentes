import { Outlet } from "react-router";

const AdminLayout = () => {
	return (
		<>
			<h1>
				Bienvenue sur l'espace d'administration du site des Films des
				Turbulentes
			</h1>
			<Outlet />
		</>
	);
};

export default AdminLayout;
