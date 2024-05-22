import gsap from "gsap";
import { FcPortraitMode } from "react-icons/fc";
import themeIcon from "../../data/day-and-night.png";
import logoutIcon from "../../data/exit.png";
import { BsChatText } from "react-icons/bs";
import { LuContact } from "react-icons/lu";
import { TbUsersPlus } from "react-icons/tb";


// images
import { useEffect, useRef, useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import logoA from '../svg/logo.svg'


const ENDPOINT = "http://localhost:3001";
import { io } from "socket.io-client";
import { useAppSelector } from "../../redux/hooks";
import { ChatGroup } from "../../interfaces/interfaces";
let socket: any = undefined;
let selectedChatCompare: any = undefined;
interface props {
  toggleNavDrawer: (val: string) => void;
  toggleGroupDrawer: () => void;
  toggleTheme: () => void;
  GroupdrawerOpen: boolean;
  isDark: boolean;
  handleSignout:()=>void;
}


const Navbar = ({ toggleNavDrawer, toggleGroupDrawer, toggleTheme, GroupdrawerOpen, isDark,handleSignout }: props) => {

  let logoRef = useRef(null);
  let FcSmsRef = useRef(null);
  let FcContactsRef = useRef(null);
  let GroupRef = useRef(null);
  let usersRef = useRef(null);
  let userInfoRef = useRef(null);

  useEffect(() => {
    const navAnimation = gsap.from([FcSmsRef.current, FcContactsRef.current, GroupRef.current, usersRef.current, userInfoRef.current], {
      duration: 1,
      x: 100,
      stagger: 0.3,

    })
    return () => {
   
      navAnimation.kill();
    }

  }, [])
  const [activeNavItem, setActiveNavItem] = useState('chat');
  const [notification, setNotification] = useState<ChatGroup[]>([]);
  const currentUser = useAppSelector((store: any) => store.auth.user);

  const handleNavItemClick = (item: string) => {
    setActiveNavItem(item);
    toggleNavDrawer(item);
  };

  const [isActive, setIsActive] = useState<any>({
    chatNav: true,
    contactNav: false,
    groupNav: false,
    userNav: false,
    infoNav: false,
  })

  const handleActive = (val: string) => {
    setIsActive({
      chatNav: val === "chatNav",
      contactNav: val === "contactNav",
      groupNav: val === "groupNav",
      userNav: val === "userNav",
      infoNav: val === "infoNav",
    })


    if (GroupdrawerOpen) {
      toggleGroupDrawer();
    }
  }

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", currentUser);
  }, []);


  useEffect(() => {
    socket.on("message received", (newMessage: any) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessage.chat._id) {
        if (notification.length > 0) {
          let newChats = notification.map((currentChat) => {
            if (currentChat._id == newMessage._id) {
              return newMessage;
            } else {
              return currentChat;
            }
          });

          setNotification(newChats);
        } else {
          setNotification([newMessage]);
        }
      } else {

      }
      selectedChatCompare = newMessage
    });
  });

  console.log(notification, "navbar")
  return (
    <>
      <div className="w-full h-screen overflow-y-hidden overflow-x-hidden md:flex flex-col justify-between transparent-bg ">
        <ul className="menu menu-vertical">
          <li>
            <div className="avatar placeholder bg-white text-blue-600" style={{ margin: '-30px', padding: '20px' }}>
              <div className="logo text-center">
                {/* <img
                  src={logoA}
                  alt=""
                  style={{ width: "80px" }}
                  className="m-auto pt-1 "
                /> */}
                <h1 className="text-6xl">CS</h1>
                
              </div>
              
            </div>
          </li>
          <li ref={FcSmsRef} style={{ marginTop: '50px' }} className={`${isActive.chatNav ? "active" : ""}`} onClick={() => handleActive('chatNav')}>
            <button
              className={`py-3 tooltip m-auto hover:bg-transparent focus:outline-none ${activeNavItem === 'chat' ? 'active' : ''
                }`}
              style={{
                background: 'transparent',
                border: "none",
                boxShadow: "none",
                color: "inherit",
              }}
              data-tip="Chats"
              onClick={() => toggleNavDrawer("chat")}
            >
              <BsChatText className="lg:text-4xl md:text-2xl text-white" />
              <div className={`absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900
                 ${notification.length == 0 ? "hidden" : ''}`}>{notification.length}</div>
            </button>
          </li>
          <li ref={FcContactsRef} className={`${isActive.contactNav ? "active" : ""}`} onClick={() => handleActive('contactNav')}>
            <button
              className="py-3 tooltip m-auto hover:bg-transparent  focus:outline-none"
              style={{

                border: "none",
                boxShadow: "none",
                color: "inherit",
              }}
              data-tip="Contacts"
              onClick={() => toggleNavDrawer("contact")}
            >

              <LuContact className="lg:text-4xl md:text-2xl text-white" />
              {/* <FcContacts className="lg:text-4xl md:text-2xl" /> */}
            </button>
          </li>
          <li ref={GroupRef} className={`${isActive.groupNav ? "active" : ""}`} onClick={() => handleActive('groupNav')}>
            <button
              className={`rounded tooltip m-auto  hover:bg-transparent focus:outline-none ${activeNavItem === 'search' ? 'active' : ''
                }`}
              style={{

                border: "none",
                boxShadow: "none",
                color: "inherit",
              }}
              data-tip="All Users"
              onClick={() => toggleNavDrawer("search")}
            >
              <TbUsersPlus className="lg:text-4xl md:text-2xl text-white" />
            </button>
          </li>
          <li ref={usersRef} className={`${isActive.userNav ? "active" : ""}`} onClick={() => handleActive('userNav')}>
            <button
              className="py-3 tooltip m-auto hover:bg-transparent focus:outline-none"
              style={{
                background: "transparent",
                border: "none",
                boxShadow: "none",
                color: "inherit",
              }}
              data-tip="Create Group"
              onClick={() => toggleGroupDrawer()}
            >
              <AiOutlineUsergroupAdd className="lg:text-4xl md:text-2xl text-white" />
            </button>
          </li>
          <li ref={userInfoRef} className={`${isActive.infoNav ? "active" : ""}`} onClick={() => handleActive('infoNav')}>
            <button
              className="py-3 tooltip m-auto hover:bg-transparent focus:outline-none"
              style={{
                background: "transparent",
                border: "none",
                boxShadow: "none",
                color: "inherit",
              }}
              data-tip="user Info"
              onClick={() => toggleNavDrawer("user")}
            >
              <FcPortraitMode className="lg:text-4xl md:text-2xl" />
            </button>
          </li>
          
        </ul>

        <ul className="menu menu-vertical ">
          <li>
            <button
              className=" tooltip"
              data-tip="Change Theme"
              onClick={() => toggleTheme()}
            >
              <img
                src={themeIcon}
                alt=""
                style={{
                  width: "40px",
                  transition: "transform 0.8s ease-in-out",
                }}
                className={`transform ${isDark ? "rotate-180" : "rotate-0"}`}
              />
            </button>
          </li>
          <li>
            <button
              className="py-3 tooltip m-auto hover:bg-transparent focus:outline-none"
              style={{
                background: "transparent",
                border: "none",
                boxShadow: "none",
                color: "inherit",
              }}
              data-tip="Sign Out"
              onClick={handleSignout}
            >
              <img
                src={logoutIcon}
                alt=""
                style={{
                  width: "40px",
                }}
              />
            </button>
          </li>

        </ul>
      </div>


    </>
  );
};

export default Navbar;
