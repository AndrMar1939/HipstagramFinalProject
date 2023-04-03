import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import UserDetailedCard from "../../../Components/User/UserDetailedCard";
import { getByIdThunk } from "../../../Store/slices/getUsersSlice";
import { isLoadingUserById } from "../../../Store/slices/getUsersSlice";


const UserPage = () => {
    const dispatch = useDispatch();
    const {userId} = useParams();
    const user = useSelector(state=> state.getUsersSlice.user);
    const isLoading = useSelector(state=> state.getUsersSlice.loading);

    console.log(user);
    useEffect(()=>{
        dispatch(getByIdThunk(userId))
    }, [])

    if(!user || user.id !==userId) {
        dispatch(isLoadingUserById());
        return <h1>...loading</h1>
    }
    if(isLoading) {
        return <h1>...loading</h1>
    }
    return (
        <UserDetailedCard user={user} />
    )
}

export default UserPage;