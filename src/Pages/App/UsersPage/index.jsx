import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUsersThunk } from "../../../Store/slices/getUsersSlice";

import UsersGeneralCard from "../../../Components/User/UsersGeneralCard";

const UsersPage = () => {
    const dispatch = useDispatch();


    const usersArr = useSelector((state) => state.getUsersSlice.users);
    const isLoading = useSelector((state) => state.getUsersSlice.loading);
    const userOwnId = useSelector((state) => state.getCurrentUser.user.id);
    const firstContentDownload = useSelector(
        (state) => state.getUsersSlice.firstContentDownload
    );

 
    useEffect(() => {
        if (firstContentDownload) {
            dispatch(getUsersThunk());
        }
    }, []);

    if (isLoading) {
        return <h1>...loading</h1>;
    }
    return (
        <>
            {!usersArr.length ? (
                <h1>Users not found</h1>
            ) : (
                usersArr
                    .filter((user) => {
                        return user._id !== userOwnId})
                    .map((user) => (
                        <UsersGeneralCard
                            user={user}
                            key={user._id}
                        ></UsersGeneralCard>
                    ))
            )}
        </>
    );
};

export default UsersPage;
