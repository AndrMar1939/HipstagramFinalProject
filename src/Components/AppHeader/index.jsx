import { NavLink} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Store/slices/currentUserSlice";


import UserIcon from "../UI/UserIconSVG";
import ButtonLogOutSVG from "../UI/ButtonLogOutSVG";
import ButtonLogOut from "../UI/ButtonLogOut";
import HeaderBox from "./HeaderBox";



const AppHeader = ({ ...props }) => {
    const dispatch = useDispatch();
    const userLogin = localStorage.getItem('userLogin');


    const activeStyle =({ isActive }) => {
        return {
            boxShadow: isActive ? "0px 3px 3px #ffd901":"none", 
        };
    };

    return (
        <HeaderBox>
            <div>
                <img src="assets/logo_main.png" alt="logo" />
            </div>
            <h1>Hipstagram</h1>
            <div>
                <NavLink to="/profile" style={activeStyle}>
                    <UserIcon/>
                    <span>{userLogin}</span>
                </NavLink>
                <ButtonLogOut onClick={()=>{dispatch(logout())}}>
                    <ButtonLogOutSVG />
                </ButtonLogOut>
            </div>
        </HeaderBox>
    );
};

export default AppHeader;
