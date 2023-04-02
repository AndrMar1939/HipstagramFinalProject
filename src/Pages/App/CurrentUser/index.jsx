import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { getCurrentUserThunk } from "../../../Store/slices/currentUserSlice";
import { getFeedSliceThunk } from "../../../Store/slices/getFeedSlice";

const CurrentUser = () => {
    const dispatch = useDispatch();
    const user = useSelector (state => state.getCurrentUser.user);
    const isLoading = useSelector((state) => state.getCurrentUser.loading);
    


    useEffect(()=>{
        if (!user) {          
            dispatch(getCurrentUserThunk());}
        console.log("user");
    }, [])

    if (!user) {
        return <h1>...loading</h1>
    }
    
    if(isLoading) {
        return <h1>...loading</h1>
    }
    return (
        <h2>{user.login}</h2>
    )
}

export default CurrentUser;