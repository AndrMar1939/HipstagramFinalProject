import { useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import UserInfoBox from "../UserDetailedCard/UserInfoBox";
import DefaultAvatar from "../DefaultAvatar/DefaultAvatar";
import UserPageButton from "../UserDetailedCard/UserPageButton";
import UserPost from "../../UserPost/UserPost";
import UserPostsBox from "../../UserPost/UserPostsBox";

const CurrentUserCard = ({ user, ...props }) => {
    const navigate = useNavigate();
    const {
        login,
        avatar,
        posts,
        followers,
        following,
        firstName,
        lastName,
        id,
    } = user;
    // p dynamic text
    const pText =
        firstName && lastName
            ? `${login} who is known as ${firstName} ${lastName}`
            : `${login} who is known as ${login}`;

    // handlers
    const handleGoToCreatePost = () => {
        navigate("/createPost");
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
                        <h2>{posts.length} posts</h2>
                        <NavLink to={"/followers/" + id}>
                            {followers.length} followers
                        </NavLink>
                        <NavLink to={"/followings/" + id}>
                            {following.length} following
                        </NavLink>
                        <div>
                            <NavLink to="/settings" />
                        </div>
                    </div>
                    <UserPageButton
                        onClick={() => {
                            handleGoToCreatePost();
                        }}
                    >
                        Add new post
                    </UserPageButton>
                    <p>{pText}</p>
                </div>
            </UserInfoBox>
            <UserPostsBox>
                {posts.length > 0 ? (
                    posts.map((item) => (
                        <UserPost
                            key={item._id}
                            onClick={() => {
                                handleGoToPost(item._id);
                            }}
                        >
                            <img src={item.imgUrl} alt="post" />
                        </UserPost>
                    ))
                ) : (
                    <h2>Empty</h2>
                )}
            </UserPostsBox>
        </>
    );
};

export default CurrentUserCard;
