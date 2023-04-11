import { Link } from "react-router-dom";
import CommentCardBox from "./CommentCardBox";
import DefaultAvatar from "../../../User/DefaultAvatar/DefaultAvatar";

const CommentCard = ({ comment, ...props }) => {
    const { owner } = comment;
    let avatar = owner.avatar ? owner.avatar : DefaultAvatar;
    return (
        <CommentCardBox>
            <div>
                <img src={avatar} alt="avatar" />
                <Link to={"/users/" + owner.id}>{owner.login}</Link>
            </div>
            <p>{comment.text}</p>
        </CommentCardBox>
    );
};

export default CommentCard;
