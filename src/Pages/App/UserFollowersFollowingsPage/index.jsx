import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import { getFollowerAndFollowingThunk } from "../../../Store/slices/followerAndFollowingSlice";

import Spinner from "../../../Components/Spinner";
import UsersGeneralCard from "../../../Components/User/UsersGeneralCard";
import ButtonBack from "../../../Components/UI/ButtonBack";

const UserFollowersFollowingsPage = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const followersArr = useSelector(
        (state) => state.getFollowerAndFollowingSlice.followers
    );
    const followingsArr = useSelector(
        (state) => state.getFollowerAndFollowingSlice.following
    );

    const isLoading = useSelector(
        (state) => state.getFollowerAndFollowingSlice.loading
    );
    const navigation = useNavigate();

    // define path and render
    const fullPath = useLocation();
    const pathArr = fullPath.pathname.split("/");
    const currentPath = pathArr[1];


    // effects
    useEffect(() => {
        dispatch(getFollowerAndFollowingThunk(userId));
    }, []);

    // render conditions

    if (isLoading) {
        return <Spinner/>;
    }

    // followers
    if (currentPath === "followers")
        return (
            <>
                <ButtonBack
                    onClick={() => {
                        navigation(-1);
                    }}
                >
                    back
                </ButtonBack>
                {!followersArr.length ? (
                    <h1>Users not found</h1>
                ) : (
                    followersArr.map((user) => (
                        <UsersGeneralCard
                            user={user}
                            key={user.id}
                            wentFromFollowPage={true}
                        ></UsersGeneralCard>
                    ))
                )}
            </>
        );

    // followings
    if (currentPath === "followings")
        return (
            <>
                <ButtonBack
                    onClick={() => {
                        navigation(-1);
                    }}
                >
                    back 
                </ButtonBack>
                {!followingsArr.length ? (
                    <h1>Users not found</h1>
                ) : (
                    followingsArr.map((user) => (
                        <UsersGeneralCard
                            user={user}
                            key={user.id}
                            wentFromFollowPage={true}
                        ></UsersGeneralCard>
                    ))
                )}
            </>
        );
};

export default UserFollowersFollowingsPage;
