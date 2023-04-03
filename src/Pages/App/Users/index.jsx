import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUsersThunk } from "../../../Store/slices/getUsersSlice";

import UsersGeneralCard from "../../../Components/User/UsersGeneralCard";

const UsersPage = () => {
    const dispatch = useDispatch();
    const usersArr = useSelector((state) => state.getUsersSlice.users);
    const isLoading = useSelector((state) => state.getUsersSlice.loading);
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
            {
                // !users.length ?
                // <h1>Users not found</h1> :
                usersArr.map((user) => (
                    <UsersGeneralCard
                        user={user}
                        key={user._id}
                    ></UsersGeneralCard>
                ))
            }
        </>
    );
};

export default UsersPage;
