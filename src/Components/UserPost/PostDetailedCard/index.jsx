import { Link, useNavigate } from "react-router-dom";

import PostDetailedContainer from "./PostDetailedContainer/index.jsx";
import ButtonLike from "../../UI/ButtonLike/ButtonLike";
import ButtonLikeSVG from "../../UI/ButtonLikeSVG";
import ButtonBack from "../../UI/ButtonBack/index.jsx";
import CommentsBox from "./CommentsBox/index.jsx";
import CommentCard from "./CommentCard";
import InputText from "../../UI/InputText";

const PostDetailedCard = ({ post, comments, ownerLogin, ...props }) => {
    const navigate = useNavigate();
    return (
        <PostDetailedContainer>
            <ButtonBack
                onClick={() => {
                    navigate(-1);
                }}
            >
                back
            </ButtonBack>
            <h2>
                Post author:
                {/* <Link to={"/users/" + post.ownerId}>{" " + ownerLogin}</Link> */}
            </h2>

            <img src={post.imgUrl} alt="post" />
            <h2>Post title:{" " + post.title}</h2>
            <div>{/* <h3>likes {" " + post.likes.length}</h3> */}</div>
            <h3>comments</h3>

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
