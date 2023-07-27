import React from "react";

export default function ChatsSidebar({
  chats,
  user,
  profiles,
  onChatSelected,
  chat: selectedChat,
}) {
  function getOtherUserprofile(chat) {
    const otherProfileId = chat.users.find((userId) => userId !== user.uid);
    return profiles.find((profile) => otherProfileId === profile.id);
  }

  return (
    <div className="chats-sidebar">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="profile-row"
          onClick={() => onChatSelected(chat)}
          style={{
            cursor: "pointer",
            fontWeight: selectedChat?.id == chat.id ? "bold" : "",
          }}
        >
          <div className="profile-holder">
            <img src={getOtherUserprofile(chat).imageUrl} alt="Profile"></img>
            <div className="ms-3">
              {getOtherUserprofile(chat).name}
              {getOtherUserprofile(chat).surname}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
