import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Spinner from "../../../Components/Spinner";
import PostDetailedCard from "../../../Components/UserPost/PostDetailedCard";
import {
    getPostByIdThunk,
    getCommentsThunk,
} from "../../../Store/slices/postSlice";
import { getByIdThunk } from "../../../Store/slices/getUsersSlice";


const PostPage = () => {
    const dispatch = useDispatch();
    const post = useSelector((state) => state.postSlice.post);
    const like = useSelector((state) => state.postSlice.like);
    const { postId } = useParams();
    const isLoading = useSelector((state) => state.postSlice.loading);
    const ownerLogin = useSelector(state=> state.getUsersSlice.user.login);

    // effects
    useEffect(() => {
        dispatch(getPostByIdThunk(postId));
        dispatch(getCommentsThunk(postId));
        dispatch(getByIdThunk(post.ownerId));
        
    }, [like]);
    useEffect(() => {
        dispatch(getByIdThunk(post.ownerId));
        
    }, [post]);

    // condition

    if (isLoading) {
        return <Spinner/>;
    }

    return <PostDetailedCard ownerLogin={ownerLogin}/>;
};

export default PostPage;
