import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { ChatGroup } from "../../interfaces/interfaces";
import SkeletonLoading from "../svg/SkeletonLoading";
import gsap from 'gsap';
const ENDPOINT = "http://localhost:3001";
import { io } from "socket.io-client";
let socket: any = undefined;
let selectedChatCompare: any = undefined;
interface props {
  upchatIndividualChat: (val: ChatGroup | undefined) => void;
  chatData: ChatGroup[] | undefined;
}
function AllChats({ upchatIndividualChat, chatData }: props) {

  const [contentHeight, setContentHeight] = useState(480);
  const [Data,setData]=useState(chatData)
  const [notification,setNotification]=useState<ChatGroup[]>([]);

  useEffect(() => {
    const contentElement = document.querySelector(".recent-chats");
    if (contentElement) {
      const height = contentElement.scrollHeight;
      setContentHeight(height);
    }
  }, []);
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", currentUser);
  }, []);


  useEffect(() => {
    socket.on("message received", (newMessage: any) => {
      if ( !selectedChatCompare || selectedChatCompare._id !== newMessage.chat._id) {
        setNotification([newMessage,...notification]);
        
      } else {
        chatData?.map((ele)=>{
          if(ele._id==newMessage._id){
            ele.latestMessage.content=newMessage.content;
          }
        })
      }
      selectedChatCompare=newMessage
    });
  });

  console.log(notification,"notification")

  // logged in user
  const currentUser = useAppSelector((store: any) => store.auth.user);

  return (
    <div className="p-2 mx-1 transparent-bg h-full overflow-hidden">
      <div
        className="pt-2 flex transparent-bg align-items-center"
        style={{ height: "12%" }}
      >
        <h5 className="inline-flex px-3 text-3xl text-white items-center mb-4 font-semibold ">
          Chats
        </h5>
      </div>

      <p className="text-2xl font-thin text-white px-2">Recent</p>
      {chatData?.length === 0 ? (
        <SkeletonLoading />
      ) : (
        <div
          className={`p-2 mb-5  custom-scrollbar overflow-y-scroll recent-chats`}
          style={{ height: "85%", display: "flex", flexDirection: "column" }}
        >
          {chatData?.map((chat: ChatGroup, index: number) => {
            return chat.isGroupChat ? (
              <div
                key={chat._id}
                className="p-3 my-2 mx-3 contact-bg "
                onClick={() => upchatIndividualChat(chat)}
              >
                <div className="hover:cursor-pointer flex align-center ">
                  <div className="userImage">
                      <img src={chat.groupPic} alt="" width={"30%"} className="" />
                  </div>

                  <div className="ps-2 ">
                    <p className="px-2 text-white uppercase">{chat.chatName}</p>
                    <p className="px-2 text-sm text-blue-600 ">
                      {chat.latestMessage?.content}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {chat.users?.map((user) => {
                  return (
                    user._id !== currentUser._id && (
                      <div
                        key={index}
                        className="my-2 mx-3  glass "
                        onClick={async () => {
                          upchatIndividualChat(chat);
                        }}
                      >
                        <div key={user._id}  className="flex hover:cursor-pointer " >
                          <div className="userImage w-24">

                          <img
                            src={user.pic}
                            alt=""
                            className=""
                         
                          />
                          </div>
                          <div className="ps-2 font-sans flex align-items-center justify-center flex-col  ">
                            <p className="px-2 text-blue-600 dark:text-white tracking-wider uppercase text-2xl" >
                              {user.name}
                            </p>
                            <p className="px-2 text-sm text-yellow-400 dark:text-cyan-300">
                              {chat.latestMessage?.content} 
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  );
                })}
              </>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AllChats;
