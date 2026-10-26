import styled from 'styled-components';

export const ButtonContainer = styled.button`
    padding: 20px;
    border: 1px solid #CDCDCD;
    background-color: ${(props) => props.$color};
    color: #FFFFFF;
    font-size: 24px;
    flex: 1;

    &:hover {
        opacity: 0.6;
    }
`