import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { getCurrentUserThunk } from "../../../Store/slices/currentUserSlice";
import Spinner from "../../../Components/Spinner";

import CurrentUserCard from "../../../Components/User/CurrentUserCard";

const CurrentUserPage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.getCurrentUser.user);
    const isLoading = useSelector((state) => state.getCurrentUser.loading);

    useEffect(() => {
        dispatch(getCurrentUserThunk());
    }, []);

    if (!user) {
        return <Spinner/>;
    }

    if (isLoading) {
        return <Spinner/>;
    }
    return <CurrentUserCard user={user} />;
};

export default CurrentUserPage;
