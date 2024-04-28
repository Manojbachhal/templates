import React, { useEffect, useState } from 'react'
import { FaCircleDot } from 'react-icons/fa6'
import { FiMessageCircle } from 'react-icons/fi'


import { RiUserSearchLine } from 'react-icons/ri'
import { ChatGroup, User } from '../../interfaces/interfaces';
import { useAppSelector } from '../../redux/hooks';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import MessageBox from './MessageBoxMobile';
import { IoMoonOutline } from 'react-icons/io5';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { LiaSignOutAltSolid } from 'react-icons/lia';

interface props {
    chatData: ChatGroup[];
    upchatIndividualChat: (indiviualChat: ChatGroup | undefined) => void;
    indivisualChat: ChatGroup | undefined;
}

interface contacts {
    contacts: User[]
}
function HomeMoblie({ chatData ,upchatIndividualChat,indivisualChat}: props) {
    // logged in user
    const [contacts, setContacts] = useState<contacts[]>([]);
    const [isChat,setIschat]=useState(false);
    const toggleTheme = () => {
        document.documentElement.classList.toggle("dark");
      };
    const currentUser = useAppSelector((store: any) => store.auth.user);
    const getContacts = async () => {
        try {
            const url = `http://localhost:3001/api/contacts`;
            let token = getCookie("Token");
            const res = await axios.get(
                url,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            //  console.log(res.data.contacts)
            setContacts(res.data.contacts)

        } catch (error) { }

    }

    const startChat = async (id: string) => {
        try {
            const url = `http://localhost:3001/api/`;
            let token = getCookie("Token");
            const res = await axios.post(
                url,
                { userId: id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.status === 200) {
                // updateChats(res.data);
            }


        } catch (error) { }
    };

    const toggleChat =(chat:any)=>{
        setIschat(!isChat);
        if(chat!==false)
            console.log(chat)
            upchatIndividualChat(chat)      
    }
    useEffect(() => {
        getContacts();
    })

    return (

        !isChat?
        <div className=' dark:bg-black h-screen '>
            <div className=' bg-orange-400'>
                <div className='p-3 pt-7 mx-auto w-11/12 flex justify-between items-center'>
                    <div className="avatar flex items-center gap-2">
                        <div className="w-12 rounded-full cursor-pointer" >
                            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                        <p className='font-bold text-2xl dark:text-white'>Chat</p>
                    </div>
                    <div className='flex items-center justify-center gap-3'>

                        <button className='tooltip bg-gray-50 rounded-full h-10 w-10' data-tip="Chats">
                            <FiMessageCircle
                                className=' m-auto'
                            />

                        </button>
                        
                        <button className="tooltip bg-gray-50 rounded-full h-10 w-10" data-tip="Create Group"  >
                        <AiOutlineUsergroupAdd className=' m-auto' />
                            
                        </button>
                        <button className="tooltip bg-gray-50 rounded-full h-10 w-10" data-tip="Theme" onClick={()=>toggleTheme()} >
                            <IoMoonOutline className=' m-auto' />
                            
                        </button>
                        <button
                            className="tooltip bg-gray-50 rounded-full h-10 w-10" data-tip="Users"
                        // onClick={() => toggleNavDrawer("search")}
                        >
                            <LiaSignOutAltSolid className=' m-auto' />
                        </button>
                    </div>
                </div>
                <div className='mx-auto w-11/12 p-3 pb-7'>
                    <input type="text" className='border-2 p-2 px-4 w-full rounded-full' placeholder='Search Contact' />
                </div>
            </div>



            {/* // contacts  */}
            <div className='bg-orange-400'>

            <div className='p-3 flex  bg-black rounded-t-3xl'>
            {/* h-1/6  */}
                {
                    contacts?.map((currentContact, index) => {
                        return currentContact.contacts.map((user) => {
                            // console.log(user)

                            return (
                                user._id !== currentUser._id && (
                                    <div
                                        key={index}
                                        className="mx-2 h-20"
                                        onClick={() => startChat(user._id)}
                                    >
                                        <div className="hover:cursor-pointer">
                                            <div className="w-16 rounded-full">

                                                <img
                                                className='rounded-full'
                                                    src={user.pic}
                                                    alt=""
                                                />
                                            </div>
                                            <div>
                                                <p className=" text-white text-1xl tracking-wider">
                                                    {user.name}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            );
                        })
                    })
                }
            </div>
            </div>


            <div className='h-4/6'>
                <div className='bg-black  pt-5 h-full'>
                    <div className='bg-slate-200 rounded-t-3xl pt-3 h-full'>
                        {chatData?.map((chat: ChatGroup, index: number) => {
                            return chat.isGroupChat ? (
                                <div
                                    key={chat._id}
                                    className="p-3 my-2 mx-3 contact-bg glass"
                                    onClick={() => toggleChat(chat)}
                                >
                                    <div className="hover:cursor-pointer">
                                        <img src={chat.groupPic} alt="" className="" />
                                        <p className="px-2">{chat.chatName}</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {chat.users?.map((user) => {
                                        return (
                                            user._id !== currentUser._id && (
                                                <div
                                                 onClick={() => toggleChat(chat)}
                                                    key={index}
                                                    className="p-3 my-2 mx-3 mt-6 h-20 contact-bg glass"

                                                >
                                                    <div className="flex hover:cursor-pointer">
                                                        <div className="w-20">

                                                            <img
                                                                src={user.pic}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="px-2  text-2xl tracking-wider">
                                                                {user.name}
                                                            </p>
                                                            <p className="px-2 text-sm text-gray-600">
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
                </div>
            </div>

        </div>
        :<MessageBox indivisualChat={indivisualChat} toggleChat={toggleChat}/>




    )
}

export default HomeMoblie