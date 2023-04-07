import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import UserDetailedCard from "../../../Components/User/UserDetailedCard";
import { getByIdThunk,  isLoadingUserById} from "../../../Store/slices/getUsersSlice";
import { followUserThunk } from "../../../Store/slices/getUsersSlice";


const UserPage = () => {
    const dispatch = useDispatch();
    const {userId} = useParams();
    const user = useSelector(state=> state.getUsersSlice.user);
    const isLoading = useSelector(state=> state.getUsersSlice.loading);
   

    // handlers
    const handleFollow = useCallback( (callback) => {
        dispatch(followUserThunk(userId))
            .then((response) => {
                if (response.error) {
                    return
                }
                callback();
            })

    }, [])


    useEffect(()=>{
        if (!user) {
            dispatch(getByIdThunk(userId));
        }
        
    }, [])

    // conditions for render

    if(!user || user.id !==userId) {
        dispatch(isLoadingUserById());
        return <h1>...loading</h1>
    }
    if(isLoading) {
        return <h1>...loading</h1>
    }

    // render
    return (
        <UserDetailedCard user={user}  handleFollow={handleFollow}/>
    )
}

export default UserPage;