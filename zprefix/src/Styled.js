import styled from 'styled-components';

const MenuDiv = styled.div`
    background: lightblue;
    display: flex;
    padding: 10px;
    border-radius: 5px;
    margin: 10px;
    justify-content:space-between;
    align-items: center;
`

const SearchButton = styled.button`
    border: none;
    margin-left: 10px;
    background-color: white;
    padding: 15px;
    border-radius: 10px;
    cursor: pointer;
    background: #7439db;
    color: white;
    &:hover {
        cursor: pointer;
    }
`
const DeleteButton = styled(SearchButton)`
    background:red;
    margin-top: 100px;
`


const LogoutButton = styled(SearchButton)`
    margin: 0px;
    height: 40px;
    text-align: center;
    padding: 0;
    padding-left: 10px;
    padding-right: 10px;
`

const DescriptionDiv = styled.div`
    margin-left: 10px;
    font-weight: ${props => props.theme === 'category' ? 'bold' : ''};
    font-size: ${props => props.theme === 'category' ? '18px' : '15px'};
`

const OfficialButton = styled.div`
    margin: 10px;
    background: white;
    border-radius: 5px;
    width: max-content;
    padding: 5px;
    &:hover {
        cursor: pointer;
        opacity: 80%;
    }
`

export {
    MenuDiv,
    SearchButton,
    DescriptionDiv,
    OfficialButton,
    LogoutButton,
    DeleteButton
}
