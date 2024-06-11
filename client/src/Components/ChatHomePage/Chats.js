import React, { useState } from "react";
import axios from "axios";

function Chats({ setChats }) {
  const [chatUser, setChatUser] = useState("");
  const [userLabel] = useState("userName");

  const handleCreateChat = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:3001/create-chat",
        {
          User: chatUser,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setChats((prevChats) => [...prevChats, response.data.chat]);
      setChatUser(""); // Clear input after creating chat
      // ("Chat created! Add another User?"); 
      // Update the label after chat is created
    } catch (error) {
      console.error("Error creating chat:", error);
      // ("Error! Try again.");
       // Update label to indicate an error
    }
  };

  const handleUserChange = (e) => {
    setChatUser(e.target.value);
    if (e.target.value === "") {
      // ("Enter chat User"); 
      // Reset label if input is cleared
    } else {
      // `Chatting with: ${e.target.value}`; 
      // Dynamic label based on input
      console.log('userLabel:', userLabel)
    }
  };

  return (
    <form onSubmit={handleCreateChat} className='new-chat-form'>
      <label>
        {userLabel}:
        <input
          type='text'
          value={chatUser}
          onChange={handleUserChange}
          placeholder='What is up?!'
        />
      </label>
      <button type='submit'>Send</button>
    </form>
  );
}

export default Chats;
