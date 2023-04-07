import { Link } from "react-router-dom";

import PostDetailedContainer from "../../../Components/UserPost/PostDetailedCard/PostDetailedContainer";
import CreatePost from "../../../Components/UserPost/CreatePost";

const CreatePostPage = ({ post, comments, ownerLogin, ...props }) => {
    return <CreatePost />;
};

export default CreatePostPage;
