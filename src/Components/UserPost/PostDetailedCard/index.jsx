import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";


import PostDetailedContainer from "./PostDetailedContainer/index.jsx";
import ButtonLike from "../../UI/ButtonLike/ButtonLike";
import ButtonLikeSVG from "../../UI/ButtonLikeSVG";
import ButtonLikedSVG from "../../UI/ButtonLikedSVG/index.jsx";
import ButtonBack from "../../UI/ButtonBack/index.jsx";
import CommentsBox from "./CommentsBox/index.jsx";
import CommentCard from "./CommentCard";
import InputText from "../../UI/InputText";
import UpdateButton from "../../User/UpdateCard/UpdateButton.jsx";
import ErrorText from "../../UI/ErrorText/index.jsx";
import {
    likePostThunk,
    addCommentThunk,
} from "../../../Store/slices/postSlice.js";

const PostDetailedCard = ({ ownerLogin, ...props }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const post = useSelector((state) => state.postSlice.post);
    const comments = useSelector((state) => state.postSlice.comments);
    const currentUserID = useSelector((state) => state.getCurrentUser.user.id);
    const { register, handleSubmit, formState, setError, reset } = useForm();


    // is liked by current user
    let isPostLiked = "";
    if (post.likes) {
        isPostLiked = post.likes.filter((item) => item._id === currentUserID)
            .length ? (
            <ButtonLikedSVG />
        ) : (
            <ButtonLikeSVG />
        );
    }
    // handel like
    const handleLike = () => {
        dispatch(likePostThunk(post._id));
    };

    // submit
    const onSubmit = (data) => {
        if (!data.comment.length) {
            setError("comment", {type: 'custom'})
            return
        } 
        const reqPayload = {
            postId: post._id,
            text: data.comment,
        };
        dispatch(addCommentThunk(reqPayload));
        reset();
    };
    // render
    return (
        <PostDetailedContainer>
            <ButtonBack
                onClick={() => {
                    navigate("/users/" + post.ownerId);
                }}
            >
                back to Author
            </ButtonBack>

            <img src={post.imgUrl} alt="post" />
            <h2>{post.title ? " " + post.title : "Post title: none"}</h2>
            <div>
                <h3>{post.likes && "likes " + post.likes.length}</h3>
                <ButtonLike
                    onClick={() => {
                        handleLike();
                    }}
                >
                    {isPostLiked}
                </ButtonLike>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <InputText
                    label="New comment"              
                    {...register("comment")}                    
                />
                <UpdateButton
                    onClick={() => {
                        setError(
                            "comment",
                            { type: "minLength" },
                        );
                    }}
                >
                    Add comment
                </UpdateButton>
                {!!formState.errors.comment && <ErrorText>must has min 1 symbol</ErrorText>}
            </form>

            <h2>comments</h2>
            <CommentsBox>
                {!comments.length ? (
                    <p>no comments</p>
                ) : (
                    comments.map((comment) => (
                        <CommentCard key={comment.id} comment={comment} />
                    ))
                )}
            </CommentsBox>
        </PostDetailedContainer>
    );
};

export default PostDetailedCard;
