import styled from "styled-components";

const HeaderBox = styled.div`
    position: fixed;
    top: 0;
    left: 50%;
    margin-left: -512px;
    padding: 0 20px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 1024px;
    height: 50px;

    color: #ffffff;

    background: rgb(77, 136, 237, 0.7);

    h1 {
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
    }
    img {
        height: 40px;
    }
    a {
        display: block;
        margin: 0 10px;
    }
    div {
        min-width: 90px;
        display: flex;
    }

    button:hover {
        border: solid 1px #FFFFFF;
    }
    a:hover {
        border: solid 1px #FFFFFF;
    }
`;

export default HeaderBox;