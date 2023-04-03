import { useEffect } from "react";
import { Navigate, Route, Routes, NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// components
import AppHeader from "../../Components/AppHeader";
import AppContainer from "../../Components/AppContainer";
import ContentBox from "./ContentBox";
import FooterNavigator from "../../Components/FooterNavigator";
// pages
import CurrentUser from "./CurrentUser";
import FeedPage from "./FeedPage";
import UsersPage from "./Users";
import UserPage from "./UserPage";

// thunk
import { getCurrentUserThunk } from "../../Store/slices/currentUserSlice";

const Application = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.getCurrentUser.user);
    // const param = useParams();
    // console.log(param);

    useEffect(()=>{
        // if (!user) {
        
        // dispatch(getCurrentUserThunk())
        // }
        
    }, [])



    return (
        <AppContainer>
            <AppHeader />
            <ContentBox>
                <Routes path="/">
                    <Route index element={<FeedPage />} />
                    <Route path="users" element={<UsersPage/>} />
                    <Route path="users/:userId" element={<UserPage/>} />
                    <Route path="profile" element={<CurrentUser />} />

                    {/* <Route path="post/:postId" element={<Post/>}/> */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </ContentBox>
            <FooterNavigator />
        </AppContainer>
    );
};

export default Application;
