import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import Wrapper from "./AuthWrapper";
import InputText from "../../Components/UI/InputText";
import Button from "../../Components/UI/Button";
import HeaderAuth from "../../Components/UI/HeaderAuth";
import AuthFormBox from "../../Components/UI/AuthFormBox";
import api from "../../services/api";
import passwordValidator from "../../helpers/passwordValidator";
import loginNameValidator from "../../helpers/loginNameValidator";
import emailValidator from "../../helpers/emailValidator";

const Registration = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ login: "", password: "", email: "" });
    const [apiError, setApiError] = useState(null);

    const isBtnDisabled = () => {
        return !form.login && !form.password && !form.email ? true : false;
    };
    // validation errors

    const [validErrorPass, setValidErrorPass] = useState({ passwordErr: false});
    const [validErrorLogin, setValidErrorLogin] = useState({ loginErr: false });
    const [validErrorEmail, setValidErrorEmail] = useState({ emailErr: false });


    // handlers
    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ( passwordValidator(form.password) && 
            loginNameValidator(form.login) &&
            emailValidator(form.email)) {
            try {
                await api.registration(form);
                navigate("/login");
            } catch (err) {
                setApiError(err.response.data);
            }
            return
        }
        // validation
        if (emailValidator(form.email) !== true) {
            setValidErrorEmail({ ...validErrorEmail, emailErr: true });
        } else  if (emailValidator(form.email) === true) {
            setValidErrorEmail({ ...validErrorEmail, emailErr: false });
        }

        if (loginNameValidator(form.login) !== true) {
            setValidErrorLogin({ ...validErrorLogin, loginErr: true });
        } else if (loginNameValidator(form.login) === true) {
            setValidErrorLogin({ ...validErrorLogin, loginErr: false });
        }

        if (passwordValidator(form.password) !== true) {
            setValidErrorPass({ ...validErrorPass, passwordErr: true });
        } else if (passwordValidator(form.password) === true) {
            setValidErrorPass({ ...validErrorPass, passwordErr: false });
        }

    };

    return (
        <Wrapper>
            <div>
                <HeaderAuth>HIPSTAGRAM</HeaderAuth>
                <h2>Sign Up</h2>
                <AuthFormBox>
                    <form onSubmit={handleSubmit}>
                        <InputText
                            label="Email"
                            type="text"
                            placeholder="email"
                            onChange={(e) =>
                                handleChange("email", e.target.value)
                            }
                            isValidError={validErrorEmail.emailErr}
                            errorText="must has type as example@mail.com"

                        />
                        <InputText
                            label="Login"
                            type="text"
                            placeholder="login"
                            onChange={(e) =>
                                handleChange("login", e.target.value)
                            }
                            isValidError={validErrorLogin.loginErr}
                            errorText="must has min 8, max 16 symbols, only digital letters and literal letters"
                        />
                        <InputText
                            label="Password"
                            type="password"
                            placeholder="password"
                            onChange={(e) =>
                                handleChange("password", e.target.value)
                            }
                            isValidError={validErrorPass.passwordErr}
                            errorText="must has min 8, max 16 symbols, only digital letters and literal letters"
                        />
                        <Button type="submit" disabled={isBtnDisabled()}>
                            Sign Up
                        </Button>
                    </form>
                </AuthFormBox>
                <p>
                    If you have account you can
                    <NavLink to="/login"> Login</NavLink>
                </p>
            </div>
        </Wrapper>
    );
};

export default Registration;
