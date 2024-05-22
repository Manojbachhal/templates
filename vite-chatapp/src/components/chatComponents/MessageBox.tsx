import { PiNavigationArrow } from "react-icons/pi"
import { ChatGroup, Message } from "../../interfaces/interfaces";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { getMessages, sendMessages } from "../../redux/chats/chatAction";
import ChatDetails from "./ChatDetails";
import { io } from "socket.io-client";

import EmojiPicker from 'emoji-picker-react';
import { FcVideoCall } from "react-icons/fc";
import { DiVim } from "react-icons/di";
interface indivisualChat {
  selectedChat: ChatGroup | undefined;
}
const ENDPOINT = "http://localhost:3001";
let socket: any = undefined;
let selectedChatCompare: any = undefined;

function MessageBox({ selectedChat }: indivisualChat) {

  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // react hooks
  const [chatHeaderDrawer, setChatheaderDrawer] = useState(false);

  const [emoji, setEmoji] = useState(false);
  //  redux
  const [Allmessages, setAllmessages] = useState<Message[]>([]);
  const currentUser = useAppSelector((store: any) => store.auth.user);

  // form ref and fn
  const msgRef = useRef<HTMLInputElement>(null);
 
  const handleEmoji = () => {
    setEmoji(!emoji)
  }
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", currentUser);
    
    socket.on('typing', () => setIsTyping(true));
    socket.on('stop typing', () => setIsTyping(false));
    return () => {
      socket.emit('disconnected')
    }
  }, [currentUser, ENDPOINT]);

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

  // const handleTyping = () => {
  //   if (!typing) {
  //     setTyping(true)
  //     socket.emit('typing', selectedChat?._id)
  //   }

  //   var time = new Date().getTime();
  //   var timeLength = 3000;
  //   setTimeout(() => {
  //     var timeNow = new Date().getTime();
  //     var timeDiff = timeNow - time;

  //     if (timeDiff >= timeLength) {
  //       socket.emit('not typing', selectedChat?._id)
  //       setTyping(false)
  //     }
  //   }, timeLength)
  // }
  const handleTyping = () => {
    if (!typing) {
      setTyping(true);
      socket.emit('typing', selectedChat?._id);
    }
  
    const typingTimeout = setTimeout(() => {
      setTyping(false);
      socket.emit('stop typing', selectedChat?._id);
    }, 2000); // Adjust the timeout duration as needed
  
    // Clear the timeout whenever typing occurs again
    return () => clearTimeout(typingTimeout);
  };

  return (
    <>
      {selectedChat ? (
        <div className="flex shadow-2xl ps-2 h-full dark:bg-black">
          <div className={` ${chatHeaderDrawer ? "w-2/3" : "w-full"}`}>
            {/* chat header */}
            <div
              className="flex dark:bg-transparent justify-evenly px-5 items-center chatheader border-b-4 border-blue-500 dark:text-white hover:cursor-pointer p-2"
              onClick={togglechatHeaderDrawer}
              style={{ height: "10%" }}
            >

              {selectedChat &&
                "isGroupChat" in selectedChat &&
                selectedChat.isGroupChat ? (

                <div className="flex w-full h-full">
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <img src={selectedChat.groupPic} />
                    </div>
                    <p className="ps-2 my-auto lg:text-3xl md:text-2xl"> {selectedChat.chatName}</p>
                  </div>


                </div>

              ) : (
                selectedChat &&
                "pic" in selectedChat.users[1] &&
                "name" in selectedChat.users[1] &&
                selectedChat.users?.map((user, index) => {
                  return (
                    user._id !== currentUser._id && (
                      <div key={index} className="flex w-full h-full">

                        {
                          user.online ? (
                            <div className="avatar online">
                              <div className="w-24">
                                <img src={user.pic} />
                              </div>
                            </div>
                          ) : (
                            <div className="avatar offline hidden">
                              <div className="w-24">
                                <img src={user.pic} />
                              </div>
                            </div>
                          )
                        }

                        <p className="ps-2 my-auto lg:text-3xl md:text-2xl">
                          {user.name}
                        </p>


                      </div>


                    )
                  );
                })
              )}
              <div className="border-l-2 ps-4">
                <FcVideoCall className="text-3xl" />
              </div>
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
              style={{ boxShadow: " gray 0px 8px 24px", height: '8%' }}
            >
               {
              isTyping?'Typing...':''
              }
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
                  onChange={handleTyping}
                />
                <EmojiPicker open={emoji} reactionsDefaultOpen={true} style={{position:'absolute',bottom:'10%',right:'9%'}} onEmojiClick={(e  ) => {
            if (msgRef.current) {
              msgRef.current.value += e.emoji;
            }
          }}/>
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
            className={` ms-2 bg-gradient-to-r from-gray-300 h-full  ${chatHeaderDrawer ? "w-1/3" : "hidden"  } text-white`}>
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
