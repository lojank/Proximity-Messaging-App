import { TbMessagePin } from "react-icons/tb";
import styled from "styled-components";

const Logo = () => {
    return (
    <MessageLogo>
        <TbMessagePin/>
    </MessageLogo>
    )
}

const MessageLogo = styled.button`
    background-color: transparent;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    color: white;
    padding-bottom: 0.3rem;
`;

export default Logo;