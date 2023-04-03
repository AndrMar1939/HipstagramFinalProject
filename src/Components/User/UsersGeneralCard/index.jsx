import { useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import UsersBox from "./UsersBox";
import FollowButton from "./FollowButton";
import DefaultAvatar from "../DefaultAvatar/DefaultAvatar";

import { followUserThunk } from "../../../Store/slices/getUsersSlice";
import { getByIdThunk } from "../../../Store/slices/getUsersSlice";
import { isLoadingUserById } from "../../../Store/slices/getUsersSlice";

const UsersGeneralCard = ({ user, ...props }) => {
    const dispatch = useDispatch();
    const { avatar, login, isFollow, _id } = user;
    const [followState, setFollowState] = useState(isFollow);
    const nav = useNavigate();

    // const currentUserId= useSelector((state) => state.getCurrentUser.user.id);
    console.log(followState);

    // handlers
    const handleFollow = () => {
        dispatch(followUserThunk(_id))
            .then((response) => {
                setFollowState(!followState);
            })
            .catch((er) => {
                console.log(er);
            });
    };

    const handleGetById = () => {
        dispatch(isLoadingUserById());
        setTimeout(() => {
            nav("/users/" + _id);
        }, 500);
       
    };

    return (
        <UsersBox
            onClick={(e) => {
                // e.stopPropagation();
                handleGetById();
            }}
        >
            <div>
                <img src={avatar ? avatar : DefaultAvatar} alt="avatar" />
                <h2>{login}</h2>
            </div>
            {followState ? (
                <FollowButton
                    isFollow={followState}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleFollow();
                    }}
                >
                    Unfollow
                </FollowButton>
            ) : (
                <FollowButton
                    isFollow={followState}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleFollow();
                    }}
                >
                    Follow
                </FollowButton>
            )}
        </UsersBox>
    );
};

export default UsersGeneralCard;
