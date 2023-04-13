import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";


import Spinner from "../../Components/Spinner";
import Wrapper from "./AuthWrapper";
import { currentUserLoginThunk } from "../../Store/slices/currentUserSlice";
import InputText from "../../Components/UI/InputText";
import Button from "../../Components/UI/Button";
import passwordValidator from "../../helpers/passwordValidator";
import loginNameValidator from "../../helpers/loginNameValidator";
import HeaderAuth from "../../Components/UI/HeaderAuth";
import AuthFormBox from "../../Components/UI/AuthFormBox";
import { cleanErrorText } from "../../Store/slices/currentUserSlice";


const Login = () => {
    const dispatch = useDispatch();

    const [form, setForm] = useState({ login: "", password: "" });
    const [validErrorPass, setValidErrorPass] = useState({
        passwordErr: false,
    });
    const [validErrorLogin, setValidErrorLogin] = useState({ loginErr: false });

    const isLoading = useSelector((state) => state.getCurrentUser.loading);
    const errorLoginText = useSelector((state) => state.getCurrentUser.errorLoginText);

    // button disabled
    const isBtnDisabled = () => {
        return !form.login && !form.password ? true : false;
    };


    // handlers
    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleCleanErrorText = () => {
        dispatch(cleanErrorText());
    };

    const handleSubmitAndValidate = (e) => {
        e.preventDefault();

        if (
            passwordValidator(form.password) === true &&
            loginNameValidator(form.login) === true
        ) {
            // dispatch
            dispatch(currentUserLoginThunk(form));
            setValidErrorLogin({ ...validErrorLogin, loginErr: false });
            setValidErrorPass({ ...validErrorPass, passwordErr: false });

            return;
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
    // is loading condition



     if (isLoading) {
        return  <Spinner/>;
     } 
    return (
        <Wrapper>            
            <div>
                {/* {errorLoginText && toast(errorLoginText)} */}
                <HeaderAuth>HIPSTAGRAM</HeaderAuth>
                <h2>Sign in</h2>
                <AuthFormBox>
                    <form onSubmit={handleSubmitAndValidate}>
                        <InputText
                            label="Login"
                            type="text"
                            placeholder="login"
                            required 
                            onChange={(e) =>
                                handleChange("login", e.target.value)
                            }
                            isValidError={validErrorLogin.loginErr}
                            errorText="must consists of letters and numeric symbols, min 2 and max 30 symbols"
                        />
                        <InputText
                            label="Password"
                            type="password"
                            placeholder="password"
                            required
                            onChange={(e) =>
                                handleChange("password", e.target.value)
                            }
                            isValidError={validErrorPass.passwordErr}
                            errorText="must has min 8, max 16 symbols, only digital letters and literal letters"
                        />
                        <Button type="submit" disabled={isBtnDisabled()}>
                            Login
                        </Button>
                    </form>
                {errorLoginText ? <h4>{errorLoginText}</h4> : ''}
                </AuthFormBox>                    
                <p>
                    If you not have account you can
                    <NavLink to="/registration"
                    onClick={()=>{handleCleanErrorText()}}> Registration</NavLink>
                </p>
            </div>
        </Wrapper>
    );
};

export default Login;
