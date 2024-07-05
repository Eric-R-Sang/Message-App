import React, { useState, useEffect } from "react";

import "./Chats.css";

// import services
import ProfileService from "../../services/profile.service";
import ChatService from "../../services/chat.service";

// import components
import AvailableChats from "./AvailableChats";
import ChatMessages from "./ChatMessages";
import ChatsSidebar from "./ChatsSidebar";

export default function ChatsPage({ user }) {
  // component state
  const [profiles, setProfiles] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chat, setChat] = useState(null);

  useEffect(() => {
    // fetchProfiles
    fetchProfiles();

    // subscribe to chats
    const unsubscribe = ChatService.subscribeToUserChats(user, (chats) => {
      // get my chats here when they are updated or changed
      setChats(chats);
    });

    // unsubscribe
    // componentWillUnmount
    return () => unsubscribe();
  }, [user]);

  async function fetchProfiles() {
    const profiles = await ProfileService.fetchProfile();
    setProfiles(profiles);
  }

  const handleNewChat = async (otherUserId) => {
    try {
      const newChat = await ChatService.createChat([user.uid, otherUserId]);
      setSelectedChat(newChat);
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>; // or handle this case as appropriate
  };
  
  return (
    <div className="container my-4">
      <h3>Chats: {user.email}</h3>

      <div>
        <AvailableChats 
          profiles={profiles} 
          user={user} 
          chats={chats} 
          onNewChat={handleNewChat}
        />
      </div>

      <div className="row mt-5">
        <div className="col-4">
          <ChatsSidebar
            profiles={profiles}
            user={user}
            chats={chats}
            chat={chat}
            selectedChat={selectedChat}
            onChatSelected={(chat) => setChat(chat)}
          />
        </div>
        <div className="col-8">
          <ChatMessages user={user} chat={chat} />
        </div>
      </div>
    </div>
  );
}
