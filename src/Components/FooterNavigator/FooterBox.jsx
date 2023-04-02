import styled from "styled-components";

const FooterBox = styled.div`
    position: fixed;
    bottom: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 1024px;
    height: 40px;

    background: rgb(77, 136, 237);

    a {
        
        height: 100%;
        width: 50%;


        vertical-align: middle;
        text-align: center; 

        color: #ffffff;
        font-weight: 700;
        font-size: 20px;
        line-height: 2;

    }

    a:hover {
        box-shadow: 0px -2px 2px #000000;        
    }
`;

export default FooterBox;