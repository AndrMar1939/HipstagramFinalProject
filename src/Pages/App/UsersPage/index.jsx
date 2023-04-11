import { useEffect, useDeferredValue, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

import {
    getUsersThunk,
    searchUserByLogin,
} from "../../../Store/slices/getUsersSlice";
import Spinner from "../../../Components/Spinner";

import UsersGeneralCard from "../../../Components/User/UsersGeneralCard";
import InputText from "../../../Components/UI/InputText";

const UsersPage = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.getUsersSlice.loading);
    const userOwnId = useSelector((state) => state.getCurrentUser.user.id);
    const firstContentDownload = useSelector(
        (state) => state.getUsersSlice.firstContentDownload
    );

    // search by login
    const users = useSelector((state) => state.getUsersSlice.users);
    const [query, setQuery] = useState("");
    const deferredQuery = useDeferredValue(query);
    // filter users
    const usersArr = users.filter((user) => {
        const login = user.login.toLowerCase();
        return (
            user._id !== userOwnId && login.includes(deferredQuery.toLocaleLowerCase())
        );
    });

    // effects
    useEffect(() => {
        if (firstContentDownload) {
            dispatch(getUsersThunk());
        }
    }, []);

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <>
            <InputText
                type="text"
                value={query}
                placeholder="search"
                onChange={(e) => setQuery(e.target.value)}
            />
            {!usersArr.length ? (
                <h1>Users not found</h1>
            ) : (
                usersArr.map((user) => (
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
