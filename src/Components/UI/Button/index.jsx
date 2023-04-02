import styled from 'styled-components';

const Button = styled.button`
    display: block;
    width: 200px;
    height: 50px;
    

    background: #4D88ED;
    border-radius: 10px;

    
    color: #ffffff;
    font-size: 24px;
    line-height: 28px;
    text-align: center;    

    background: ${props=> props.disabled ? '#a8b6ce' : '#4D88ED'}

    
`;
export default Button;