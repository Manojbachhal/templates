import { FaCircleDot } from "react-icons/fa6";
import { PiNavigationArrow } from "react-icons/pi";
import { IoChatbubblesOutline } from "react-icons/io5";
import { ChatGroup, Message } from "../../interfaces/interfaces";
import { TfiControlBackward } from "react-icons/tfi";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getMessages, sendMessages } from "../../redux/chats/chatAction";
import ChatDetails from "../chatComponents/ChatDetails";
import { SlEmotsmile } from "react-icons/sl";
import { FiLink2 } from "react-icons/fi";

import { io } from 'socket.io-client'
interface indivisualChat {
  indivisualChat: ChatGroup | undefined;
  toggleChat:(val:any)=>void
}
let socket:any;
function MessageBox({ indivisualChat ,toggleChat}: indivisualChat) {
  // react hooks
  const [chatHeaderDrawer, setChatheaderDrawer] = useState(false);
  const [chatDetails, setChatDetails] = useState(true);

  //  redux
  const [Allmessages, setAllMessage] = useState(useAppSelector((store: any) => store.chats.allMessages));
  const currentUser = useAppSelector((store: any) => store.auth.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    socket = io('http://localhost:3001');

    socket.emit('set up', (currentUser))
  }, [])
  useEffect(()=>{
    socket.on("message recieved", (newMessageRecieved:any) => {
      if(newMessageRecieved){
        console.log(newMessageRecieved)
      }
    })
  })


  // form ref and fn
  const msgRef = useRef<HTMLInputElement>(null);
  const handleMessageSend = async (e: React.FormEvent<HTMLFormElement>) => {
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
    let res = await sendMessages("/api/message", content, chatId);
    socket.emit('send Messages', res?.data);

    setAllMessage((prev: ChatGroup[]) => [...prev, res?.data])
    msgRef.current.value = "";
  };

  useEffect(() => {
    // socket.on('new message',(newMessage)=>{
    //   console.log(newMessage)
    // })
  })


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
      socket.emit('room', indivisualChat._id)
    }
  }, [indivisualChat && indivisualChat._id]);

  return (
    <>
     
        <div className="flex transparent-bg" style={{ height: '100vh' }}>
          <div className={`p-2 ${chatHeaderDrawer ? "w-2/3" : "w-full"}`}>
            
            <div
              className="flex justify-between transparent-bg chatheader border-b-4 border-orange-500  hover:cursor-pointer p-2"
              onClick={togglechatHeaderDrawer}
            >
            <button className="bg-orange-400 text-white top-4 flex align-center items-center h-10 p-3" onClick={()=>toggleChat(false)}><TfiControlBackward/></button>
              {indivisualChat &&
                "isGroupChat" in indivisualChat &&
                indivisualChat.isGroupChat ? (
                <>
                  <img src={indivisualChat.groupPic} alt="" width={"80px"} />
                  <p className="ps-2 my-auto text-2xl font-bold tracking-wider text-gray-500">
                    {indivisualChat.chatName}
                  </p>
                </>
              ) : (
                indivisualChat &&
                "pic" in indivisualChat.users[1] &&
                "name" in indivisualChat.users[1] && (

                  indivisualChat.users?.map((user, index) => {
                    return (
                      user._id !== currentUser._id && (
                        <div
                          key={index}
                          className="flex "

                        >

                          <div className="flex w-24">
                            <img
                              src={user.pic}
                              alt=""
                              width={"80%"}
                              className="rounded-full"
                            />
                            <FaCircleDot className="text-green-400 my-auto ms-2 relative top-5  right-5" />
                          </div>
                          <p className="ps-2 my-auto text-2xl font-bold tracking-wider text-blue-500">
                            {user.name}
                          </p>
                        </div>

                      )
                    );
                  })
                )
              )}





            </div>


            <div className="chatbody custom-scrollbar overflow-y-scroll bg-white">
              {Allmessages.map((currentMsg: Message) => {
               
                return (
                  <>

                    <div className={`chat mt-6 ${currentUser && currentUser._id == currentMsg.sender._id
                      ? "chat-end "
                      : "chat-start "
                      }`}>
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <img alt="chat bubble component" src={currentMsg.sender.pic} />
                        </div>
                      </div>
                      <div className="chat-header text-xs">
                      {currentUser && currentUser._id == currentMsg.sender._id
                      ? 
                    "Send By You":
                      currentMsg.sender.name
                      }
                        {/* <time className="text-xs opacity-50">12:45</time> */}
                      </div>
                      <div className="chat-bubble">{currentMsg.content}</div>
                      <div className="chat-footer opacity-50 text-xs">
                        Delivered
                      </div>
                    </div>

                    
                  </>
                );
              })}
            </div>
            <div className="chatfooter">
              <form
                action=""
                className="flex pt-1 pb-1 my-auto"
                onSubmit={handleMessageSend}
              >
                <div className="w-4/6 ">

                <input
                  type="text"
                  ref={msgRef}
                  className="p-4 w-full focus:outline-none bg-slate-200 "
                />
                </div>
               
                <div className="border-2 w-2/6 flex justify-evenly">
                <button >
                    <SlEmotsmile className=" text-white text-4xl p-1.5 bg-orange-600 rounded-full" />
                  </button>
                  <button >
                    <FiLink2 className=" text-white text-4xl p-1.5 bg-orange-600 rounded-full" />
                  </button>
                  <button type="submit">
                    <PiNavigationArrow className="transform rotate-90 text-white text-4xl p-1.5 bg-orange-600 rounded-full" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className={` ms-2 ${chatHeaderDrawer ? "w-1/3" : "hidden"} text-white`} style={{ height: '95vh' }}>
            <ChatDetails
              togglechatHeaderDrawer={togglechatHeaderDrawer}
              indivisualChat={indivisualChat}
            />

          </div>
        </div>
      
    </>
  );
}

export default MessageBox;
