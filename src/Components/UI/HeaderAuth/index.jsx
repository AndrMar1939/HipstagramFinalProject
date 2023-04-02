import styled from "styled-components";

const HeaderAuth = styled.h1`
    font-weight: 700;
    font-size: 72px;
    line-height: 84px;
    margin-bottom: 40px;

    &:before {
        content: "";
        display: inline-block;
        background-image: url(assets/logo_main.png);
        width: 100px;
        height: 100px;
        vertical-align: text-bottom;
    }
`;

export default HeaderAuth;