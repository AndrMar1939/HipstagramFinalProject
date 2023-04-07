import styled from "styled-components";

const FeedPost = styled.div`
    width: 400px;
    height: 300px;
    padding: 10px 4px;
    margin: 0 auto 20px;

    border-radius: 10px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  

    img {
        max-width: 100%;
        height: 100%;
    }
    &:hover {
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
        cursor: pointer;
    }

`;

export default FeedPost;