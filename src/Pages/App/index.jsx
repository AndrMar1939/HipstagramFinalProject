import { useEffect } from "react";
import { Navigate, Route, Routes, NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// components
import AppHeader from "../../Components/AppHeader";
import AppContainer from "../../Components/AppContainer";
import ContentBox from "./ContentBox";
import FooterNavigator from "../../Components/FooterNavigator";
import Spinner from "../../Components/Spinner";

// pages
import FeedPage from "./FeedPage";
import UsersPage from "./UsersPage";
import UserPage from "./UserPage";
import CurrentUserPage from "./CurrentUser";
import UserUpdatePage from "./UserUpdatePage";
import UserFollowersFollowingsPage from "./UserFollowersFollowingsPage";
import PostPage from "./PostPage";
import CreatePostPage from "./CreatePostPage";

// thunk
import { getCurrentUserThunk } from "../../Store/slices/currentUserSlice";

const Application = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.getCurrentUser.user);
    const userLogin = localStorage.getItem("userLogin");

    useEffect(() => {
        if (!user || !userLogin) {
            dispatch(getCurrentUserThunk());
        }
    }, []);

    if (!user) {
        return <Spinner/>;
    }

    return (
        <AppContainer>
            <AppHeader />
            <ContentBox>
                <Routes path="/">
                    <Route index element={<FeedPage />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="users/:userId" element={<UserPage />} />
                    <Route path={"users/"+user.id} element={<CurrentUserPage />} />
                    <Route path="settings" element={<UserUpdatePage />} />
                    <Route path="followers/:userId" element={<UserFollowersFollowingsPage />} />
                    <Route path="followings/:userId" element={<UserFollowersFollowingsPage />} />                    
                    <Route path="posts/:postId" element={<PostPage/>}/>
                    <Route path="createPost" element={<CreatePostPage/>}/>
                    <Route path="*" element={<Navigate to="/" />} />
                   
                </Routes>
            </ContentBox>
            <FooterNavigator />
        </AppContainer>
    );
};

export default Application;
