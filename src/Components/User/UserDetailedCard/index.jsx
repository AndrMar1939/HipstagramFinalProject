import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import UserBox from "./UserBox";
import UserInfoBox from "./UserInfoBox";
import DefaultAvatar from "../DefaultAvatar/DefaultAvatar";
import UserPageButton from "./UserPageButton";
import UserPost from "../../UI/UserPost/UserPost";
import UserPostsBox from "../../UI/UserPost/UserPostsBox";

const UserDetailedCard = ({ user, ...props }) => {
    const { login, avatar, posts, followersCount, followingsCount } = user;
    console.log(followersCount)

    return (
        <UserBox>
            <UserInfoBox>
                <img src={avatar ? avatar : DefaultAvatar} alt="avatar" />
                <div>
                    <div>
                        <h2>{typeof posts === 'object' ? posts.length : posts} posts</h2>
                        <h2>
                            {followersCount} followers
                        </h2>
                        <h2>
                            {followingsCount} following
                        </h2>
                    </div>
                    <UserPageButton>button</UserPageButton>
                    <p>{login}</p>
                </div>
            </UserInfoBox>
            <UserPostsBox>
                {posts.length > 0 ? (
                    posts.map((item) => (
                        <UserPost key={item._id}>
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
        </UserBox>
    );
};

export default UserDetailedCard;
