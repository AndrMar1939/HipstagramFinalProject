import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import UsersBox from "./UsersBox";
import FollowButton from "./FollowButton";
import DefaultAvatar from "../DefaultAvatar/DefaultAvatar";



const UsersGeneralCard = ({ user, ...props }) => {
    const { avatar, login, isFollow} = user;

    


    return (
        <UsersBox>
            <div>
                <img src={avatar? avatar :DefaultAvatar} alt="avatar" />
                <h2>{login}</h2>
            </div>
            {isFollow ? (
                <FollowButton isFollow={isFollow}>Unfollow</FollowButton>
            ) : (
                <FollowButton isFollow={isFollow}>Follow</FollowButton>
            )}
        </UsersBox>
    );
};

export default UsersGeneralCard;
