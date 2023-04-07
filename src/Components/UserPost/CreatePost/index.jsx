import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import PostDetailedContainer from "../PostDetailedCard/PostDetailedContainer/index.jsx";
import InputText from "../../UI/InputText/index.jsx";
import Button from "../../UI/Button";
import DefaultAvatar from "../../User/DefaultAvatar/DefaultAvatar.js";
import FormCreatePost from "./FormCreatePost/FormCreatePost.jsx";

import { createPostThunk } from "../../../Store/slices/postSlice.js";

const CreatePost = ({ post, comments, ownerLogin, ...props }) => {
    const navigate = useNavigate();
    const isLoading = useSelector((state) => state.postSlice.loading);
    const userID = useSelector((state) => state.getCurrentUser.user.id);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState } = useForm({});
    const [postImg, setPostImg] = useState({
        imagePreviewUrl: null,
        file: null,
    });
    console.log(postImg.file, userID);

    // button disable condition

    const isBtnDisabled = () => {
        return !postImg.file ? true : false;
    };

    // handlers
    const handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onload = () => {
            setPostImg({
                file: file,
                imagePreviewUrl: reader.result,
            });
        };

        reader.readAsDataURL(file);
    };

    // submit
    const usersDataSubmit = (data) => {
        const reqPayload = {
            title: data.title,
            image: postImg.file,
        };
        dispatch(createPostThunk({ ...reqPayload })).then((response) => {
            if (response.error) {
                return response;
            }
            navigate('/users/'+ userID);
        });
    };
    // condition for render
    if (isLoading) {
        return <h1>...loading</h1>;
    }
    // render
    return (
        <PostDetailedContainer>
            <h2>Create new post</h2>
            <FormCreatePost onSubmit={handleSubmit(usersDataSubmit)}>
                <label>
                    <img
                        src={
                            postImg.imagePreviewUrl
                                ? postImg.imagePreviewUrl
                                : DefaultAvatar
                        }
                        alt="post img"
                    />
                    <input
                        name="image"
                        type="file"
                        onChange={(e) => {
                            handleImageChange(e);
                        }}
                        hidden
                    />
                </label>
                <InputText
                    label="Post title"
                    type="text"
                    name="title"
                    {...register("title")}
                />
                <Button disabled={isBtnDisabled()}>Upload</Button>
            </FormCreatePost>
        </PostDetailedContainer>
    );
};

export default CreatePost;
