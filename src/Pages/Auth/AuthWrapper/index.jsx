import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: end;

    margin: 0 auto;
    padding: 20px 100px;

    max-width: 1334px;
    min-height: 750px;
    
    background-image: url(assets/auth_cover.png);
    background-repeat: no-repeat;
    

    h2 {
        font-size: 24px;
        line-height: 28px;
        margin-bottom: 20px;
    }

    div {
        text-align: center;
        max-width: 700px;
        p {
            font-size: 18px;
            line-height: 21px;
        }
    }
`;

export default Wrapper