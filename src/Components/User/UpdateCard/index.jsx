import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import Spinner from "../../Spinner";
import InputText from "../../UI/InputText";
import UpdateCardBox from "./UpdateCardBox";
import DefaultAvatar from "../DefaultAvatar/DefaultAvatar";
import UpdateButton from "./UpdateButton";

import { convertToBase64 } from "../../../helpers/convertToBase64";
import {
    updateCurrentUserThunk,
    updatePasswordThunk,
} from "../../../Store/slices/currentUserSlice";

import ErrorText from "../../UI/ErrorText";
import ConfirmText from "../../UI/ConfirmText";

const UpdateCard = () => {
    const isLoading = useSelector((state) => state.getCurrentUser.loading);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.getCurrentUser.user);
    const confirmPasswordText = useSelector(
        (state) => state.getCurrentUser.profile.confirmPasswordText
    );
    const errorPasswordText = useSelector(
        (state) => state.getCurrentUser.profile.errorPasswordText
    );
    const confirmProfileChanges = useSelector(
        (state) => state.getCurrentUser.profile.confirmProfileChanges
    );
    const errorProfileChanges = useSelector(
        (state) => state.getCurrentUser.profile.errorProfileChanges
    );

    const [avatar, setAvatar] = useState(user.avatar);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
    } = useForm({
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            login: user.login,
            email: user.email,
            confirm: "",
            confirmPassword: "",
        },
    });
    console.log(errors);

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
        };
        dispatch(updateCurrentUserThunk({ ...reqPayload, avatar }));
    };

    // password and validation
    const usersPasswordSubmit = (data) => {
        if (data.password !== data.confirmPassword) {
            setError("confirmPassword", { type: "confirm password" });
            return;
        }
        const reqPayload = {
            password: data.password,
            confirmPassword: data.confirmPassword,
        };
        dispatch(updatePasswordThunk({ ...reqPayload }));
        setValue("password", "");
        setValue("confirmPassword", "");
    };

    // condition

    if (!user || isLoading) {
        return <Spinner />;
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
                            {...register("login", {
                                minLength: 2,
                                maxLength: 30,
                                pattern: /^[a-zA-Z0-9]+$/i,
                            })}
                        />

                        <InputText
                            label="First name"
                            type="text"
                            name="firstName"
                            {...register("firstName", {
                                maxLength: 30,
                                pattern: /^[a-zA-Z]+$/i,
                            })}
                        />
                        <InputText
                            label="Email"
                            type="email"
                            {...register("email", {
                                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i,
                            })}
                        />
                        <InputText
                            label="Last name"
                            type="text"
                            {...register("lastName", {
                                maxLength: 30,
                                pattern: /^[a-zA-Z]+$/i,
                            })}
                        />
                    </fieldset>
                    <UpdateButton type="submit">Change profile</UpdateButton>
                    {errors?.login && (
                        <ErrorText>
                            Login must consists of letters and numeric symbols,
                            min 2 and max 30 symbols
                        </ErrorText>
                    )}
                    {errors?.firstName && (
                        <ErrorText>
                            First name must consists of letters and max 30
                            symbols
                        </ErrorText>
                    )}
                    {errors?.lastName && (
                        <ErrorText>
                            First name must consists of letters and max 30
                            symbols
                        </ErrorText>
                    )}
                    {errors?.email && (
                        <ErrorText>
                            email must has type as "example@mail.com"
                        </ErrorText>
                    )}
                    {confirmProfileChanges && (
                        <ConfirmText>{confirmProfileChanges}</ConfirmText>
                    )}
                    {errorProfileChanges && (
                        <ErrorText>{errorProfileChanges}</ErrorText>
                    )}
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
                            {...register("password", {
                                minLength: 8,
                                maxLength: 16,
                                pattern: /^(?=.*[0-9])[a-zA-Z0-9]+$/i,
                            })}
                        />
                        <InputText
                            label="Confirm password"
                            type="password"
                            required
                            {...register("confirmPassword")}
                        />
                    </fieldset>
                    <UpdateButton>Save password</UpdateButton>
                    {errors?.password && (
                        <ErrorText>
                            password must has min 8, max 16 symbols, only
                            digital letters and literal letters
                        </ErrorText>
                    )}
                    {errors?.confirmPassword && (
                        <ErrorText>passwords must be the same</ErrorText>
                    )}
                    {confirmPasswordText && (
                        <ConfirmText>{confirmPasswordText}</ConfirmText>
                    )}
                    {errorPasswordText && (
                        <ErrorText>{errorPasswordText}</ErrorText>
                    )}
                </form>
            </UpdateCardBox>
        </>
    );
};
export default UpdateCard;
