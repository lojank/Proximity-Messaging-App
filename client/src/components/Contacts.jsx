import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    setCurrentUserName(data.username);
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <Container>
      { contacts.length > 0 ? (
      <div className="contacts">
        
        {contacts.map((contact, index) => (
          
          <div
            key={contact._id}
            className={`contact ${index === currentSelected ? "selected" : ""}`}
            onClick={() => changeCurrentChat(index, contact)}
          >
            <div className="username">
              <h3>{contact.username}</h3>
            </div>
          </div>
        ))}
      </div> ) : (
        <div className="no-contacts-message">
          <h1>No users nearby</h1>
        </div>
      )}
      <div className="current-user">
        <div className="username">
          <h2>{currentUserName}</h2>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 85% 15%;
  overflow: hidden;
  background-color: #222222;

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    padding-top: 0.8rem;
    gap: 0.8rem;

    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .contact {
      background-color: #333333;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.8rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;

      &.selected {
        background-color: #444444;
      }

      .username {
        h3 {
          color: white;
        }
      }
    }
  }

  .no-contacts-message {
    display: flex;
    justify-content: center;
    align-items: center;
    h1 {
      text-align: center;
      color: white;
      font-size: 1.5rem;
    }
  }

  .current-user {
    background-color: #333332;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    .username {
      h2 {
        color: white;
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;

      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;