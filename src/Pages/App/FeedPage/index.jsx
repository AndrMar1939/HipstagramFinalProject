import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getFeedSliceThunk } from "../../../Store/slices/getFeedSlice";
import { getCurrentUserThunk } from "../../../Store/slices/currentUserSlice";

import FeedBox from "../../../Components/UI/Feed/FeedBox";
import UserPostsBox from "../../../Components/UI/UserPost/UserPostsBox";
import UserPost from "../../../Components/UI/UserPost/UserPost";

const FeedPage = () => {
    const dispatch = useDispatch();
    const feedArr = useSelector((state) => state.getFeedSlice.feedContent);
    const isLoading = useSelector((state) => state.getFeedSlice.loading);
    const firstContentDownload = useSelector(
        (state) => state.getFeedSlice.firstContentDownload
    );


    useEffect(() => {
        if (firstContentDownload) {
            dispatch(getFeedSliceThunk());
        }
    }, []);

    if (isLoading) {
        return <h1>...loading</h1>;
    }

    return (
        <FeedBox>
            <UserPostsBox>
                {feedArr.length > 0 ? (
                    feedArr.map((item) => (
                        <UserPost key={item._id}>
                            <img src={item.imgUrl} alt="post" />
                            <div>
                                <h2>{item.likes.length} likes</h2>
                            </div>
                        </UserPost>
                    ))
                ) : (
                    <h2>Empty</h2>
                )}
            </UserPostsBox>
        </FeedBox>
    );
};

export default FeedPage;
