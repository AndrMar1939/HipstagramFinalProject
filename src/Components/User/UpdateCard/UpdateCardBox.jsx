import styled from "styled-components";

const UpdateCardBox = styled.div`
    width: 800px;
    padding: 30px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    border-bottom: 1px solid #C0BFBF;


    form {     
        width: 100%;     

        fieldset {
            display: flex;
            flex-wrap: wrap;   
            justify-content: space-between;
            align-items: center;


            label {
                margin: 0 auto;
            }
        }
    }


    img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-bottom: 30px;
    }   

    h1 {
        margin-bottom: 30px;

        font-size: 24px;
        line-height: 28px;
        text-align: center;

        border: 1px, solid, #000000;
    }


    

`;

export default UpdateCardBox;