import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";
import Logo from './Logo'
const ChatHeader = () => {
  const navigate = useNavigate();

  const handleClickLogout = async ( ) => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
  <Container>
    <div className="brand">
      <Logo />
      <h3>Proximity Messaging</h3>   
    </div>
    <Button onClick={handleClickLogout}>
      <BiPowerOff />
    </Button>
    </Container>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: black;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 1.3rem;
    
  
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 90vw;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  
`;

export default ChatHeader