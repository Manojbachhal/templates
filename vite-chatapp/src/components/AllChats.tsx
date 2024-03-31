import React, { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { ChatGroup } from "../interfaces/interfaces";

interface props {
  upchatIndividualChat: (val: ChatGroup | undefined) => void;
  chatData: ChatGroup[] | undefined;
}
function AllChats({ upchatIndividualChat, chatData }: props) {
  console.log(chatData);
  const [contentHeight, setContentHeight] = useState(600);

  // Calculate the height of the content
  useEffect(() => {
    const contentElement = document.querySelector(".recent-chats");
    if (contentElement) {
      const height = contentElement.scrollHeight;
      setContentHeight(height);
    }
  }, []);

  // console.log(contentHeight);

  return (
    <div className="m-2 mt-5 transparent-bg h-90-percent">
      <div className=" p-1">
        <p className="text-2xl font-2xl text-white px-2">Chats</p>
      </div>
      <div
        className={`p-2 custom-scrollbar ${
          contentHeight > 600 ? "overflow-y-scroll" : ""
        }  recent-chats`}
      >
        <p className="text-2xl font-thin text-white px-2">Recent</p>
        {chatData?.map((chat: ChatGroup, index: number) => {
          return chat.isGroupChat ? (
            <div
              key={chat._id}
              className="p-3 my-2 mx-3 contact-bg"
              onClick={async () => {
                upchatIndividualChat(chat);
              }}
            >
              <div key={chat._id} className="hover:cursor-pointer">
                <img src={chat.groupPic} alt="" className="" />
                <p className="px-2 text-white">{chat.chatName}</p>
              </div>
            </div>
          ) : (
            <div
              key={index}
              className="p-3 my-2 mx-3 contact-bg"
              onClick={async () => {
                upchatIndividualChat(chat);
              }}
            >
              <div
                key={chat.users[1]._id}
                className="flex hover:cursor-pointer"
              >
                <img
                  src={chat.users[1].pic}
                  alt=""
                  width={"40px"}
                  className="rounded-full"
                />
                <div>
                  <p className="px-2 text-white uppercase">
                    {chat.users[1].name}
                  </p>
                  <p className="px-2 text-sm text-blue-400 ">
                    {chat.latestMessage?.content}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllChats;
