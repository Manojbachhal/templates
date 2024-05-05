import { FaCircleDot } from "react-icons/fa6";
import { PiNavigationArrow } from "react-icons/pi";
import { IoChatbubblesOutline } from "react-icons/io5";
import { ChatGroup, Message } from "../interfaces/interfaces";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getMessages, sendMessages } from "../redux/chats/chatAction";
import ChatDetails from "./ChatDetails";
import { io } from "socket.io-client";

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

  //  redux
  const [Allmessages, setAllmessages] = useState<Message[]>([]);
  const currentUser = useAppSelector((store: any) => store.auth.user);

  // form ref and fn
  const msgRef = useRef<HTMLInputElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", currentUser);
  }, []);

  useEffect(() => {
    socket.on("message recieved", (newMessage: any) => {
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
        <div className="flex shadow-2xl ps-2 h-full">
          <div className={` ${chatHeaderDrawer ? "w-2/3" : "w-full"}`}>
            {/* chat header */}
            <div
              className="flex dark:bg-transparent chatheader border-b-4 border-green-500 hover:cursor-pointer p-2"
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
                        <div className="relative">
                          <img
                            className="w-10 h-10 rounded-full ring-2 ring-gray-300 dark:ring-white-500"
                            src={user.pic}
                            alt=""
                          />
                          <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                        </div>

                        <p className="text-sm ps-2 my-auto text-white">
                          {user.name}
                        </p>
                      </div>
                    )
                  );
                })
              )}
            </div>

            {/* chat body */}
            <div
              className="chatbody bg-transparent custom-scrollbar overflow-y-scroll scroll-snap-y-container flex flex-col "
              id="chatBox"
            >
              {Allmessages.map((currentMsg: Message) => {
                return (
                  <>
                    <div
                      key={currentMsg.sender._id}
                      className={`flex pt-5 justify-end ${
                        currentUser && currentUser._id == currentMsg.sender._id
                          ? "text-red-950 flex-row slide-left"
                          : "flex-row-reverse slide-left"
                      }`}
                    >
                      <img
                        src={currentMsg.sender.pic}
                        alt=""
                        className="w-8 mt-2 rounded-full order-2"
                      />
                      <div
                        className={`order-1 px-5 py-2 text-white text-justify chat-bubble ${
                          currentUser &&
                          currentUser._id == currentMsg.sender._id
                            ? "chat-bubble--right secoundary"
                            : "chat-bubble--left primary"
                        }`}
                      >
                        {currentMsg.content}
                      </div>
                    </div>
                  </>
                );
              })}
            </div>

            {/* chat footer */}
            <div
              className="chatfooter transparent-bg px-2 flex items-stretch rounded-full"
              style={{ boxShadow: " gray 0px 8px 24px" }}
            >
              <form
                action=""
                className="flex items-stretch w-full"
                onSubmit={handleMessageSend}
              >
                <input
                  type="text"
                  ref={msgRef}
                  placeholder="Write Message"
                  className="flex-1 px-2 focus:outline-none bg-transparent placeholder-blue-500  dark:placeholder-gray-500 "
                />
                <div className="border-l-2 w-16 flex items-center justify-center">
                  <button type="submit" className="rounded-full bg-blue-500">
                    <PiNavigationArrow className="transform rotate-90 text-white text-3xl p-1" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div
            className={` ms-2  ${
              chatHeaderDrawer ? "w-1/3" : "hidden"
            } text-white`}
            style={{ height: "95vh" }}
          >
            <ChatDetails
              togglechatHeaderDrawer={togglechatHeaderDrawer}
              selectedChat={selectedChat}
            />
          </div>
        </div>
      ) : (
        <div className="shadow-2xl transparent-bg h-full p-2">
          <div className="my-auto  ">
            <h1 className="text-5xl text-blue-700 text-center">
              Click a chat to start a conversation
            </h1>
            <IoChatbubblesOutline className="text-8xl m-auto mt-4 text-blue-700" />
          </div>
        </div>
      )}
    </>
  );
}

export default MessageBox;
