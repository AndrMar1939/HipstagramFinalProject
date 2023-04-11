import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Store/slices/currentUserSlice";

import UserIcon from "../UI/UserIconSVG";
import ButtonLogOutSVG from "../UI/ButtonLogOutSVG";
import ButtonLogOut from "../UI/ButtonLogOut";
import HeaderBox from "./HeaderBox";

import { activeHeader } from "../../helpers/activeHeader";

const AppHeader = () => {
    const dispatch = useDispatch();
    const userLogin = localStorage.getItem("userLogin");
    const { pathname } = useLocation();
    const currentUserId = useSelector((state) => state.getCurrentUser.user.id);

    // headers and Navlinks style

    let defaultHeader = "Hipstagram";

    const activeStyle = ({ isActive }) => {
        return {
            borderBottom: isActive ? "solid 2px #ffd901" : "none",
        };
    };

    // render
    return (
        <HeaderBox>
            <div>
                <img src="/assets/logo_main.png" alt="logo" />
            </div>
            <h1>
                {activeHeader(pathname)
                    ? activeHeader(pathname)
                    : defaultHeader}
            </h1>
            <div>
                <NavLink to={"users/" + currentUserId} style={activeStyle}>
                    <UserIcon />
                    <span>{userLogin}</span>
                </NavLink>
                <ButtonLogOut
                    onClick={() => {
                        dispatch(logout());
                    }}
                >
                    <ButtonLogOutSVG />
                </ButtonLogOut>
            </div>
        </HeaderBox>
    );
};

export default AppHeader;
