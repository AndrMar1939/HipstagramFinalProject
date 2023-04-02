import styled from 'styled-components';

const BoxInput = styled.div`
    width: 360px;
    padding: 0 4px;
    text-align: center;    
    min-height: 110px;
    transition: 0.33s;
    margin: 0 auto;

    label {
        display: block;
        font-size: 14px;
        line-height: 16px;
        margin-bottom: 6px;
        text-align: start;
        
    }

    span {
        display: inline-block;
        margin: 0 0 6px 20px;
    }

    input {
        display: block;
        height: 50px;
        width: 360px;
        font-size: 18px;
        line-height: 21px;
        border: 1px solid #C0BFBF;
        border-radius: 10px;
        padding: 0 20px;
    }

    h3 {    
        font-size: 12px;
        line-height: 14px;
        color: #FF3535;
        overflow: hidden;
        transition: 0.33s;
        max-height: ${props => props.isValidError === true ? 'none' : 0};   
    }
    
`;
export default BoxInput;