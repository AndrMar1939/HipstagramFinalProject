import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import UserInfoBox from "./UserInfoBox";
import DefaultAvatar from "../DefaultAvatar/DefaultAvatar";
import UserPageButton from "./UserPageButton";
import UserPost from "../../UserPost/UserPost";
import UserPostsBox from "../../UserPost/UserPostsBox";

import {
    subscribeForUser,
    unsubscribeForUser,
    toggleIsFollow,
} from "../../../Store/slices/getUsersSlice";
import {
    addSubscribe,
    removeSubscribe,
} from "../../../Store/slices/currentUserSlice";

const UserDetailedCard = ({ user, handleFollow, ...props }) => {
    const dispatch = useDispatch();
    const {
        login,
        avatar,
        posts,
        followersCount,
        followingsCount,
        firstName,
        lastName,
        id,
    } = user;
    const navigate = useNavigate();

    // this user is followed? calculating and set state
    const arrFollowing = useSelector(
        (state) => state.getCurrentUser.user.following
    );
    const isFollow = arrFollowing.filter((user) => user.id === id);

    const [followState, setFollowState] = useState(isFollow.length);

    // condition for  "p text"
    const pText =
        firstName && lastName
            ? `${login} hipsta who is known as ${firstName} ${lastName}`
            : `${login} hipsta who is known as ${login}`;

    // handlers
    const handleColorButton = () => {
        if (followState) {
            dispatch(unsubscribeForUser());
            dispatch(removeSubscribe(user));
            dispatch(toggleIsFollow(id));
        } else if (!followState) {
            dispatch(subscribeForUser());
            dispatch(addSubscribe(user));
            dispatch(toggleIsFollow(id));
        }
        setFollowState(!followState);
    };
    const handleGoToPost = (postId) => {
        navigate("/posts/" +postId);
    };
    // render

    return (
        <>
            <UserInfoBox>
                <img src={avatar ? avatar : DefaultAvatar} alt="avatar" />
                <div>
                    <div>
                        <h2>
                            {typeof posts === "object" ? posts.length : posts}{" "}
                            posts
                        </h2>
                        <NavLink to={"/followers/" + id}>
                            {followersCount} followers
                        </NavLink>
                        <NavLink to={"/followings/" + id}>
                            {followingsCount} following
                        </NavLink>
                    </div>
                    {followState ? (
                        <UserPageButton
                            isFollow={followState}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleFollow(handleColorButton);
                            }}
                        >
                            Unfollow
                        </UserPageButton>
                    ) : (
                        <UserPageButton
                            isFollow={followState}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleFollow(handleColorButton);
                            }}
                        >
                            Follow
                        </UserPageButton>
                    )}
                    <p>{pText}</p>
                </div>
            </UserInfoBox>
            <UserPostsBox>
                {posts.length > 0 ? (
                    posts.map((item) => (
                        <UserPost
                            key={item._id}
                            onClick={() => {
                                console.log(item._id)
                                handleGoToPost(item._id);
                            }}
                        >
                            <img src={item.imgUrl} alt="post" />
                            <div>
                                <h2>{item.likes.length} likes</h2>
                            </div>
                        </UserPost>
                    ))
                ) : (
                    <h2>Empty</h2>
                )}
            </UserPostsBox>
        </>
    );
};

export default UserDetailedCard;
