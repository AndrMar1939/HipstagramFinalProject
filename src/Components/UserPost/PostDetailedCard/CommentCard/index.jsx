import { Link } from "react-router-dom";
import CommentCardBox from "./CommentCardBox";

const CommentCard = ({ comment, ...props }) => {
    const { owner } = comment;
    return (
        <CommentCardBox>
            <div>
                <img src={owner.avatar} alt="avatar" />
                <Link to={"/users/" + owner.id}>{owner.login}</Link>
            </div>
            <p>{comment.text}</p>
        </CommentCardBox>
    );
};

export default CommentCard;
