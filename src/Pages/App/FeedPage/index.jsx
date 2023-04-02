import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { getFeedSliceThunk } from "../../../Store/slices/getFeedSlice";

const FeedPage = () => {
    const dispatch = useDispatch();
    const feedArr = useSelector (state => state.getFeedSlice.feedContent);
    const isLoading = useSelector((state) => state.getFeedSlice.loading);
    const firstContentDownload = useSelector((state)=> state.getFeedSlice.firstContentDownload);

    console.log(firstContentDownload);

    useEffect(()=>{
        if (firstContentDownload) {
            dispatch(getFeedSliceThunk());
        }        
    }, []);
    
    if(isLoading) {
        return <h1>...loading</h1>
    }

    if(!feedArr.length) {
        return <h1>empty</h1>
    }

    return (
        <h2>feed</h2>
    )
}

export default FeedPage;