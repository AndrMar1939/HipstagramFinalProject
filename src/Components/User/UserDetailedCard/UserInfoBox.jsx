import styled from "styled-components";

const UserInfoBox = styled.div`
    width: 700px;
    min-height: 200px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    border-bottom: 1px solid #c0bfbf;
    margin-bottom: 20px;
    transition: 0.33s;

    img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }
    a {
        font-size: 24px;
        line-height: 28px;
        text-align: center;
    }
    a:hover {
        text-decoration: underline;
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

            div {
                width: 40px;
                margin: 0;

                a {
                    display: block;
                    width: 40px;
                    height: 40px;

                    background-image: url(/assets/settings-icon.png);
                    background-size: cover;
                    background-repeat: no-repeat;


                    transition: 1s;
                }

                a:hover {
                    animation: rotationGear 1.5s;
                }
                @keyframes rotationGear {
                     100% {
                        transform: rotate(360deg);
                    }
                }
            }
        }
    }
`;

export default UserInfoBox;
