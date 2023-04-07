import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import UsersBox from "./UsersBox";
import FollowButton from "./FollowButton";
import DefaultAvatar from "../DefaultAvatar/DefaultAvatar";

import {
    followUserThunk,
    toggleIsFollow,
    getByIdThunk,
} from "../../../Store/slices/getUsersSlice";

import {
    removeSubscribe,
    addSubscribe,
} from "../../../Store/slices/currentUserSlice";

import { followPageLoading } from "../../../Store/slices/followerAndFollowingSlice";

const UsersGeneralCard = ({ user, wentFromFollowPage, ...props }) => {
    const dispatch = useDispatch();
    const { avatar, login, isFollow } = user;
    const [followState, setFollowState] = useState(isFollow);
    const navigate = useNavigate();
    const id = user._id ? user._id : user.id;
    

    // auth user id and checking is user own id equal to id
    const userOwnId = useSelector((state) => state.getCurrentUser.user.id);

    // create user with 'id' and remove '_id' for local work for button 'follow'.
    // this action removes bugs for subscribe and unsubscribe
    const newUser = { ...user, id };

    // handlers
    const handleFollow = () => {
        dispatch(followUserThunk(id)).then((response) => {
            if (response.error) {
                return;
            }
            if (followState) {
                dispatch(removeSubscribe(newUser));
            } else {
                dispatch(addSubscribe(newUser));
            }
            dispatch(toggleIsFollow(id));
            setFollowState(!followState);
        });
    };

    const handleGetById = () => {
        dispatch(followPageLoading());
        dispatch(getByIdThunk(id)).then((response) => {
            if (response.error) {
                return;
            }
            navigate("/users/" + id);
        });
    };

    // condition and render. If id is the same, remove subscribe button

    if (id !== userOwnId && wentFromFollowPage !== true)

    return (
        <UsersBox
            onClick={(e) => {
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

    if (wentFromFollowPage )
    return (
        <UsersBox
            onClick={(e) => {
                handleGetById();
            }}
        >
            <div>
                <img src={avatar ? avatar : DefaultAvatar} alt="avatar" />
                {id === userOwnId 
                    ? <h2>WTF... it is me</h2> 
                    : <h2>{login}</h2>}
                
            </div>
        </UsersBox>
    );
};

export default UsersGeneralCard;
