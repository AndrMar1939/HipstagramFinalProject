import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getCurrentUserThunk } from "../../../Store/slices/currentUserSlice";
import { getFeedSliceThunk } from "../../../Store/slices/getFeedSlice";

import UserPage from "../UserPage";
import UserDetailedCard from "../../../Components/User/UserDetailedCard";

const CurrentUser = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.getCurrentUser.user);
    const isLoading = useSelector((state) => state.getCurrentUser.loading);
    // const {path} = useParams();
    // console.log(path);

    useEffect(() => {
        if (!user) {
            dispatch(getCurrentUserThunk());
        }
    }, []);

    if (!user) {
        return <h1>...loading</h1>;
    }

    if (isLoading) {
        return <h1>...loading</h1>;
    }
    return <UserDetailedCard user={user}/>;
};

export default CurrentUser;
