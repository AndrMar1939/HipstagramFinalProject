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

    background: rgb(77, 136, 237);

    h1 {
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
    }
    img {
        height: 40px;
    }
    a {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 10px;

        color: #FFFFFF;
    }
    div {
        min-width: 130px;
        display: flex;
        align-items: center;
        justify-content: space-between;

    }

    button:hover {
        box-shadow: -2px 2px 2px #000000;   
    }
    a:hover {
        box-shadow: 2px 2px 2px #000000;        
    }
   
`;

export default HeaderBox;