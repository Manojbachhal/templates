import { FaCircleDot } from "react-icons/fa6";
import { PiNavigationArrow } from "react-icons/pi";
import { IoChatbubblesOutline } from "react-icons/io5";
import { ChatGroup, Message } from "../interfaces/interfaces";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getMessages, sendMessages } from "../redux/chats/chatAction";
import ChatHeaderDrawer from "./ChatHeaderDrawer";
interface indivisualChat {
  indivisualChat: ChatGroup | undefined;
}
function MessageBox({ indivisualChat }: indivisualChat) {
  // react hooks
  const [chatHeaderDrawer, setChatheaderDrawer] = useState(false);

  //  redux
  const Allmessages = useAppSelector((store: any) => store.chats.allMessages);
  const currentUser = useAppSelector((store: any) => store.auth.user);
  const dispatch = useAppDispatch();

  // form ref and fn
  const msgRef = useRef<HTMLInputElement>(null);
  const handleMessageSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!indivisualChat) {
      console.error("indivisualChat is undefined");
      return;
    }
    let chatId = indivisualChat._id;
    if (msgRef.current === null) {
      return;
    }

    const content = msgRef.current.value;
    dispatch<any>(sendMessages("/api/message", content, chatId));
    msgRef.current.value = "";
  };

  // drawer
  const togglechatHeaderDrawer = () => {
    setChatheaderDrawer(!chatHeaderDrawer);
  };

  // get all msg from a chat
  const getAllMessages = () => {
    if (indivisualChat)
      dispatch<any>(getMessages("/api/message", indivisualChat._id));
  };

  useEffect(() => {
    if (indivisualChat && indivisualChat._id) {
      getAllMessages();
    }
  }, [indivisualChat && indivisualChat._id]);

  return (
    <>
      <ChatHeaderDrawer
        chatHeaderDrawer={chatHeaderDrawer}
        togglechatHeaderDrawer={togglechatHeaderDrawer}
        indivisualChat={indivisualChat}
      />
      {indivisualChat ? (
        <>
          <div className="h-full">
            <div
              className="flex chatheader border-b-4 border-green-500 hover:cursor-pointer p-2"
              onClick={togglechatHeaderDrawer}
            >
              {indivisualChat &&
              "isGroupChat" in indivisualChat &&
              indivisualChat.isGroupChat ? (
                <>
                  <img src={indivisualChat.groupPic} alt="" width={"80px"} />
                  <p className="text-sm ps-2 my-auto text-gray-500">
                    {indivisualChat.chatName}
                  </p>
                  {/* <FaCircleDot className="text-green-400 my-auto ms-2" /> */}
                </>
              ) : (
                indivisualChat &&
                "pic" in indivisualChat.users[1] &&
                "name" in indivisualChat.users[1] && (
                  <>
                    <img
                      src={indivisualChat.users[1].pic}
                      alt=""
                      width={"40px"}
                    />
                    <p className="text-sm ps-2 my-auto text-gray-500">
                      {indivisualChat.users[1].name}
                    </p>
                    <FaCircleDot className="text-green-400 my-auto ms-2" />
                  </>
                )
              )}
            </div>
            <div className="chatbody custom-scrollbar overflow-y-scroll">
              {Allmessages.map((currentMsg: Message) => {
                return (
                  <>
                    <div
                      className={`flex pt-5 justify-end ${
                        currentUser && currentUser._id == currentMsg.sender._id
                          ? "text-red-950 flex-row"
                          : "flex-row-reverse"
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
            <div className="chatfooter border-t-2 shadow-lg ">
              <form
                action=""
                className="flex pt-1 pb-1 px-2  my-auto"
                onSubmit={handleMessageSend}
              >
                <input
                  type="text"
                  ref={msgRef}
                  className="p-2 w-5/6 focus:outline-none bg-slate-200 "
                />
                <div className="border-2 w-1/6">
                  <button type="submit">
                    <PiNavigationArrow className="transform rotate-90 text-primary text-4xl" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <div
          style={{
            background:
              "linear-gradient(to bottom right, #1f4037 57%, white 54%)",
            height: "100%",
          }}
          className="flex items-center justify-center"
        >
          <div>
            <h1 className="text-5xl text-black">Click to start a chat</h1>
            <IoChatbubblesOutline className="text-8xl m-auto mt-4 text-primary" />
          </div>
        </div>
      )}
    </>
  );
}

export default MessageBox;
