import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import InputText from "../../UI/InputText";
import UpdateCardBox from "./UpdateCardBox";
import DefaultAvatar from "../DefaultAvatar/DefaultAvatar";
import UpdateButton from "./UpdateButton";

import { convertToBase64 } from "../../../helpers/convertToBase64";
import { updateCurrentUserThunk, updatePasswordThunk } from "../../../Store/slices/currentUserSlice";

const UpdateCard = () => {
    const isLoading = useSelector((state) => state.getCurrentUser.loading);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.getCurrentUser.user);

    const [avatar, setAvatar] = useState(user.avatar);

    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            login: user.login,
            email: user.email,
        }
    });


    // handlers
    const handelAvatarChange = async (e) => {
        const base64Url = await convertToBase64(e.target.files[0]);
        setAvatar(base64Url);
    };

    const usersDataSubmit = (data) => {
        const reqPayload = {
            firstName: data.firstName, 
            lastName: data.lastName, 
            login: data.login,
            email: data.email,
        
        }
        dispatch(updateCurrentUserThunk({...reqPayload, avatar}));
    }
    const usersPasswordSubmit = (data) => {
        const reqPayload = {
            password: data.password, 
            confirmPassword: data.confirmPassword,         
        }
        dispatch(updatePasswordThunk({...reqPayload}));
    }

    // condition

    if (!user || isLoading) {
        return <h1>...loading</h1>;
    }

    return (
        <>
            <UpdateCardBox>
                <form onSubmit={handleSubmit(usersDataSubmit)}>
                    <fieldset>
                        <label>
                            <img
                                src={avatar ? avatar : DefaultAvatar}
                                alt="avatar"
                            />
                            <input
                                type="file"
                                onChange={(e) => {
                                    handelAvatarChange(e);
                                }}
                                hidden
                            />
                        </label>
                    </fieldset>

                    <fieldset>
                        <InputText
                            label="Login"
                            type="text"

                            {...register("login")}
                        />
                        <InputText
                            label="First name"
                            type="text"
                            name="firstName"

                            {...register("firstName")}
                        />
                        <InputText
                            label="Email"
                            type="email"

                            {...register("email")}
                        />
                        <InputText
                            label="Last name"
                            type="text"

                            {...register("lastName")}
                        />
                    </fieldset>
                    <UpdateButton type="submit">Change profile</UpdateButton>
                </form>
            </UpdateCardBox>
            <UpdateCardBox>
                <form onSubmit={handleSubmit(usersPasswordSubmit)}>
                    <h1>Password changing</h1>
                    <fieldset>
                        <InputText
                            label="Password"
                            type="password"
                            required
                            {...register("password")}
                        />
                        <InputText
                            label="Confirm password"
                            type="password"
                            required
                            {...register("confirmPassword")}
                        />
                    </fieldset>
                    <UpdateButton>Save password</UpdateButton>
                </form>
            </UpdateCardBox>
        </>
    );
};
export default UpdateCard;
