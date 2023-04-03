import styled from "styled-components";

const UserPost = styled.div`
    width: 48%;
    height: 260px;
    padding: 10px 4px;
    margin: 0 1% 10px 1%;

    border: 1px solid #c0bfbf;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    

    img {
        max-width: 340px;
        height: 200px;
    }

    h2 {
        font-size: 24px;
        line-height: 28px;
        text-align: center;
    }

    // div {
    //     display: flex;
    //     // justify-content: ;
    //     align-items: center;
    // }
`;

export default UserPost;