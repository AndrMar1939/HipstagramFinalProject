import styled from 'styled-components';

const FollowButton = styled.button`
    display: block;
    width: 120px;
    height: 30px;


    
    background: #4D88ED;
    border-radius: 5px;

    color: #ffffff;
    font-size: 14px;
    line-height: 16px;
    text-align: center; 

    background: ${props=> props.isFollow ?  '#FE7171' : '#4D88ED'};

    &:hover {
        background: ${props=> props.isFollow ?  '#f81f1f' : '#1c64e0'}; 
    }

    
`;
export default FollowButton;