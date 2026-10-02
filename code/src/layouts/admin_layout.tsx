import { Outlet } from "react-router";
import Guard from "../components/admin/guard";

const AdminLayout = () => {
	return (
		<Guard roles={["admin"]}>
			<h1>
				Bienvenue sur l'espace d'administration du site des Films des
				Turbulentes
			</h1>
			<Outlet />
		</Guard>
	);
};

export default AdminLayout;
