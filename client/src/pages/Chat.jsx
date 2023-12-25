import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host, updateLocationRoute } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import ChatHeader from '../components/ChatHeader'

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [longitude, setLongitude] = useState(undefined);
  const [latitude, setLatitude] = useState(undefined);

  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }
  }, []);

  useEffect(() => {
    const refreshContacts = async () => {
      if (currentUser && latitude && longitude) {
        socket.current = io(host);
        socket.current.emit("add-user", currentUser._id);
  
        try {
          // Update location for the current user
          await axios.post(`${updateLocationRoute}`, {
            "_id": currentUser._id,
            "latitude": latitude,
            "longitude": longitude
          });
  
          // Fetch updated contacts based on the new location
          const response = await axios.post(`${allUsersRoute}/${currentUser._id}`, {
            "latitude": latitude,
            "longitude": longitude
          });
  
          setContacts(response.data);
          console.log('done');
        } catch (error) {
          console.error("Error while updating location / fetching contacts:", error);
        }
      }
    };
  
    const location = window.navigator && window.navigator.geolocation;
    if (location) {
      location.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }
  
    const locationUpdateInterval = setInterval(() => {
      refreshContacts();
    }, 10000); // Update interval in milliseconds (e.g., 10000 ms = 10 seconds)
  
    return () => {
      clearInterval(locationUpdateInterval);
    };
  }, [currentUser, latitude, longitude]);
  
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <Container>
        <ChatHeader />
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
        <div className='instruction'>        
           <h3>Please select a chat to start messaging</h3>
        </div>
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: black;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #222222;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
  .instruction {
    display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  }
`;

