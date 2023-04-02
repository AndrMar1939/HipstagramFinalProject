import styled from "styled-components";

const UsersBox = styled.div`
    width: 700px;
    height: 70px;
    margin: 5px 0;
    padding: 0 30px;


    display: flex;
    justify-content: space-between;
    align-items: center;

    border: 1px solid #C0BFBF;
    border-radius: 10px;

    img {
        width: 60px;
        height: 60px;

        margin-right: 30px;

        border-radius: 50%;
    }

   

    h2 {
        font-size: 24px;
        line-height: 28px;
        text-align: center;
    }

    div {
        display: flex;
        // justify-content: ;
        align-items: center;
    }
`;

export default UsersBox;