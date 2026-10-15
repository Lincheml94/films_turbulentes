import { Outlet } from "react-router";

// import Guard from "../components/admin/guard";

const AdminLayout = () => {
	return (
		<>
			{/* <Guard roles={["admin"]}> */}

			<Outlet />

			{/* </Guard> */}
		</>
	);
};

export default AdminLayout;
