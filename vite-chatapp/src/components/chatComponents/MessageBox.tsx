import { PiNavigationArrow } from "react-icons/pi";
import { IoChatbubblesOutline } from "react-icons/io5";
import { ChatGroup, Message } from "../../interfaces/interfaces";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { getMessages, sendMessages } from "../../redux/chats/chatAction";
import ChatDetails from "./ChatDetails";
import { io } from "socket.io-client";

import mobileBanner from '../../data/undraw_Modern_design_re_dlp8.png'
import DeskTopBanner from '../../data/undraw_online_message_re_3m5v.png'
import EmojiPicker from 'emoji-picker-react';

interface indivisualChat {
  selectedChat: ChatGroup | undefined;
}
const ENDPOINT = "http://localhost:3001";
let socket: any = undefined;
let selectedChatCompare: any = undefined;

function MessageBox({ selectedChat }: indivisualChat) {

  // react hooks
  const [chatHeaderDrawer, setChatheaderDrawer] = useState(false);
  const [chatDetails, setChatDetails] = useState(true);
  const [emoji, setEmoji] = useState(false);
  //  redux
  const [Allmessages, setAllmessages] = useState<Message[]>([]);
  const currentUser = useAppSelector((store: any) => store.auth.user);

  // form ref and fn
  const msgRef = useRef<HTMLInputElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const handleEmoji = () => {
    setEmoji(!emoji)
  }
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", currentUser);
  }, []);

  useEffect(() => {
    socket.on("message received", (newMessage: any) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessage.chat._id
      ) {
        return;
      } else {
        setAllmessages([...Allmessages, newMessage]);
      }
    });
  });

  const handleMessageSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedChat) {
      console.error("selectedChat is undefined");
      return;
    }
    let chatId = selectedChat._id;
    if (msgRef.current === null) {
      return;
    }

    const content = msgRef.current.value;
    let res: any = await sendMessages("/api/message", content, chatId);

    let data = [...Allmessages, res.data];

    socket.emit("new message", res.data, res.data.chat.users);
    setAllmessages(data);

    msgRef.current.value = "";
  };

  // drawer
  const togglechatHeaderDrawer = () => {
    setChatheaderDrawer(!chatHeaderDrawer);
  };

  // get all msg from a chat
  const getAllMessages = async () => {
    if (selectedChat) {
      let res = await getMessages("/api/message", selectedChat._id);
      setAllmessages(res);
      console.log(res);
      socket.emit("join chat", selectedChat._id);
    }
  };

  useEffect(() => {
    const chatBox = document.getElementById("chatBox");
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  });

  useEffect(() => {
    if (selectedChat && selectedChat._id) {
      getAllMessages();
      selectedChatCompare = selectedChat;
    }
  }, [selectedChat && selectedChat._id]);



  return (
    <>
      {selectedChat ? (
        <div className=" flex shadow-2xl ps-2 h-full dark:bg-black">
          <div className={` ${chatHeaderDrawer ? "w-2/3" : "w-full"}`}>
            {/* chat header */}
            <div
              className="flex dark:bg-transparent chatheader border-b-4 border-blue-500 dark:text-white hover:cursor-pointer p-2"
              onClick={togglechatHeaderDrawer}
              style={{ height: "12%" }}
            >

              {selectedChat &&
                "isGroupChat" in selectedChat &&
                selectedChat.isGroupChat ? (
                <>
                  <img src={selectedChat.groupPic} alt="" width={"80px"} />
                  <p className="text-sm ps-2 my-auto text-gray-500">
                    {selectedChat.chatName}
                  </p>
                </>
              ) : (
                selectedChat &&
                "pic" in selectedChat.users[1] &&
                "name" in selectedChat.users[1] &&
                selectedChat.users?.map((user, index) => {
                  return (
                    user._id !== currentUser._id && (
                      <div key={index} className="flex w-full h-full">
                        <div className="avatar online">
                          <div className="w-24 rounded-full">
                            <img src={user.pic} />
                          </div>
                        </div>

                        <p className="ps-2 my-auto lg:text-3xl md:text-2xl">
                          {user.name}
                        </p>

                        {/* <div className="avatar offline hidden">
                          <div className="w-24 rounded-full">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                          </div>
                        </div> */}
                      </div>


                    )
                  );
                })
              )}
            </div>

            {/* chat body */}
            <div
              className="chatbody bg-transparent custom-scrollbar overflow-y-scroll px-5 scroll-snap-y-container flex flex-col overflow-x-hidden dark:text-white"
              id="chatBox"
            >
              {Allmessages.map((currentMsg: Message) => {
                return (
                  <>
                    {
                      currentUser._id !== currentMsg.sender._id ? <div className="chat chat-start">
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS chat bubble component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                          </div>
                        </div>
                        <div className="chat-header">
                          {currentMsg.sender.name}

                          {/* <time className="text-xs opacity-50">12:45</time> */}
                        </div>
                        <div className="chat-bubble">{currentMsg.content}</div>
                        {/* <div className="chat-footer opacity-50">
                      Delivered
                    </div> */}
                      </div> : <div className="chat chat-end">
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS chat bubble component" src={currentMsg.sender.pic} />
                          </div>
                        </div>
                        <div className="chat-header">
                          {currentMsg.sender.name}
                        </div>
                        <div className="chat-bubble bg-blue-500">{currentMsg.content}</div>

                      </div>
                    }
                  </>
                );
              })}
            </div>

            {/* chat footer */}
            <div
              className="transparent-bg w-11/12 mt-2 m-auto px-2 flex items-stretch rounded"
              style={{ boxShadow: " gray 0px 8px 24px" }}
            >

              <form
                action=""
                className="flex items-stretch py-2.5 w-full"
                onSubmit={handleMessageSend}
              >
                <input
                  type="text"
                  ref={msgRef}
                  placeholder="Write Message"
                  className="flex-1 mx-auto px-2 focus:outline-none bg-transparent placeholder-blue-500  dark:placeholder-gray-500 "
                />
                {/* <EmojiPicker open={emoji} reactionsDefaultOpen={true} style={{position:'absolute',bottom:'10%',right:'9%'}} /> */}
                <div className="border-l-2 w-32 flex items-center justify-around">

                  <button className={`rounded-full p-1 ${emoji ? "bg-blue-200" : "bg-blue-500"} `} onClick={handleEmoji} > 😊 </button>
                  <button type="submit" className="rounded-full bg-blue-500">
                    <PiNavigationArrow className="transform rotate-90 text-white text-3xl p-1" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div
            className={` ms-2 bg-gradient-to-r from-gray-300 h-full  ${chatHeaderDrawer ? "w-1/3" : "hidden"
              } text-white`}
           
          >
            <ChatDetails
              togglechatHeaderDrawer={togglechatHeaderDrawer}
              selectedChat={selectedChat}
            />
          </div>
        </div>
      ) : (
        <div className="shadow-2xl bg-white dark:bg-black h-full p-2 sm:hidden" >

          <div className="diff aspect-[12/9] h-full">
            <div className="diff-item-1">
              <div className="bg-primary text-primary-content text-9xl font-black grid place-content-center">  Click a chat to start a conversation</div>
            </div>
            <div className="diff-item-2">
              <div className="bg-base-200 text-9xl font-black grid place-content-center">  Click a chat to start a conversation</div>
            </div>
            <div className="diff-resizer"></div>
          </div>

        </div>

      )}
    </>
  );
}

export default MessageBox;
// https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg