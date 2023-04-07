import styled from "styled-components";

const AuthFormBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    max-width: 400px;
    a {
        font-size: 18px;
        line-height: 21px;
    }

    button {
        margin: 10px auto 36px;
    }
`;

export default AuthFormBox;