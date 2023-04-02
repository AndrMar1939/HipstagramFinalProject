import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Store/slices/currentUserSlice";


import UserIcon from "../UI/UserIconSVG";
import ButtonLogOutSVG from "../UI/ButtonLogOutSVG";
import ButtonLogOut from "../UI/ButtonLogOut";
import HeaderBox from "./HeaderBox";



const AppHeader = ({ ...props }) => {
    const dispatch = useDispatch();
    return (
        <HeaderBox>
            <div>
                <img src="assets/logo_main.png" alt="logo" />
            </div>
            <h1>Header</h1>
            <div>
                <NavLink to="/profile">
                    <UserIcon/>
                </NavLink>
                <ButtonLogOut onClick={()=>{dispatch(logout())}}>
                    <ButtonLogOutSVG />
                </ButtonLogOut>
            </div>
        </HeaderBox>
    );
};

export default AppHeader;
