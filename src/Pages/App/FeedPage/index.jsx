import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getFeedSliceThunk } from "../../../Store/slices/getFeedSlice";

import FeedBox from "../../../Components/UI/Feed/FeedBox";
import FeedPost from "../../../Components/UI/Feed/FeedPost";

const FeedPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    // handlers
    const handleGoToPost = (postId) => {
        navigate("/posts/" +postId);
    };

    if (isLoading) {
        return <h1>...loading</h1>;
    }

    return (
        <FeedBox>
            {feedArr.length > 0 ? (
                feedArr.map((item) => (
                    <FeedPost
                        key={item._id}
                        onClick={() => {
                            handleGoToPost(item._id);
                        }}
                    >
                        <img src={item.imgUrl} alt="post" />
                    </FeedPost>
                ))
            ) : (
                <h2>Empty</h2>
            )}
        </FeedBox>
    );
};

export default FeedPage;
