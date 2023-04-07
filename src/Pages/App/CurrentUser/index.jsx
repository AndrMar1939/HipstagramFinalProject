import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getCurrentUserThunk } from "../../../Store/slices/currentUserSlice";
import { getFeedSliceThunk } from "../../../Store/slices/getFeedSlice";

import CurrentUserCard from "../../../Components/User/CurrentUserCard";

const CurrentUserPage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.getCurrentUser.user);
    const isLoading = useSelector((state) => state.getCurrentUser.loading);

    useEffect(() => {
        dispatch(getCurrentUserThunk());
    }, []);

    if (!user) {
        return <h1>...loading</h1>;
    }

    if (isLoading) {
        return <h1>...loading</h1>;
    }
    return <CurrentUserCard user={user} />;
};

export default CurrentUserPage;
