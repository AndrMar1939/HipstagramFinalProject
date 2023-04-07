import styled from "styled-components";

const PostDetailedContainer = styled.div`
    width: 800px;
    padding: 10px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    img {
        max-width: 100%;
        max-height: 800px;
        margin-bottom: 10px;
    }

    a {
        font-weight: 700;
    }

    h2 {
        width: 100%;
        margin-bottom: 10px;
        padding-bottom: 5px;

        font-size: 24px;
        line-height: 28px;
        text-align: center;

        border-bottom: 1px #000000 solid;
    }
    h3 {
        font-size: 18px;
        line-height: 20px;
        text-align: center;
        margin-bottom: 10px;
    }

`;

export default PostDetailedContainer;
