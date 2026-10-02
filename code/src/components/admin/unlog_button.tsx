import { ImCross } from "react-icons/im";
import { NavLink } from "react-router";
import style from "../../assets/css/login_button.module.css";

const UnlogButton = () => {
	return (
		<button type="submit" className={style.button_login}>
			<NavLink to={"/login"}>
				<ImCross />
			</NavLink>
		</button>
	);
};
export default UnlogButton;
