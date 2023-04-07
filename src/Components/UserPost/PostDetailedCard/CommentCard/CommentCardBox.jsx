import styled from "styled-components";

const CommentCardBox = styled.div`
    width: 50%;
    min-height: 50px;
    margin: 5px 0;

    display: flex;
    align-items: center;


    div {
        display: flex;
        align-items: center;

        min-width: 200px;
        margin-right: 20px;
        border-right: 1px solid #c0bfbf;

        a {
            font-weight: 700;
            margin-right: 20px;
        }
        a:hover {
            text-decoration: underline;
        }

        img {
            height: 40px;
            width: 40px;
            border-radius: 50%;
            margin-right: 20px;
        }
    }
`;

export default CommentCardBox;
