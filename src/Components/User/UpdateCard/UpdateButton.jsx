import styled from 'styled-components';

const UpdateButton = styled.button`
    display: block;
    width: 140px;
    height: 40px;

    margin: 0 auto;
    

    background: #4D88ED;
    border-radius: 10px;

    
    color: #ffffff;
    font-size: 14px;
    line-height: 16px;
    text-align: center;    

    
    background: ${props => props.disabled ? '#a8b6ce' : '#4D88ED'};

    
    &:hover {        
        background: ${props => props.disabled ? '#a8b6ce' : ' #1c64e0'};       
    }

    
`;
export default UpdateButton;