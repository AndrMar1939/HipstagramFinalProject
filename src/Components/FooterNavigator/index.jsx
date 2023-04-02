import { NavLink } from "react-router-dom";
import FooterBox from "./FooterBox";



const FooterNavigator = () => {
    const activeStyle =({ isActive }) => {
        return {
            background: isActive ? "#ffd901" : "none",
            color: isActive ? "#4D88ED" : "#FFFFFF"
        };
    };


    return (
        <FooterBox>
            <NavLink to="/" style={activeStyle}>Feed</NavLink>
            <NavLink to="/users" style={activeStyle}>Users</NavLink>
            {/* <NavLink to="/profile" style={activeStyle}>Profile</NavLink> */}
        </FooterBox>
    );
};

export default FooterNavigator;
