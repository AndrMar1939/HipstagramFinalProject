import styled from 'styled-components';

const UserPageButton = styled.button`
    display: block;
    width: 420px;
    height: 40px;
    margin-bottom: 20px;


    
    background: #4D88ED;
    border-radius: 5px;

    color: #ffffff;
    font-size: 24px;
    line-height: 28px;
    text-align: center;


    background: ${props=> props.isFollow ?  '#FE7171' : '#4D88ED'};

    &:hover {
        background: ${props=> props.isFollow ?  '#f81f1f' : '#1c64e0'} ;
    }


    
`;
export default UserPageButton;