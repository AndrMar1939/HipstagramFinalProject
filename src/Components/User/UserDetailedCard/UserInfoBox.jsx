import styled from "styled-components";

const UserInfoBox = styled.div`
    width: 700px;
    min-height: 200px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    border-bottom: 1px solid #C0BFBF;
    margin-bottom: 20px;


    img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }   

    h2 {
        font-size: 24px;
        line-height: 28px;
        text-align: center;
    }
    p {
        font-size: 18px;
        line-height: 21px;
        text-align: center;
    }

    
    div {
        width: 420px;

        div {            
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
        }
    }
`;

export default UserInfoBox;