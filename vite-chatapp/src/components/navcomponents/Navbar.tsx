import gsap from "gsap";
import { FcSms } from "react-icons/fc";
import { FcContacts } from "react-icons/fc";
import { FcPortraitMode } from "react-icons/fc";
import userSearchLogo from "../../data/researcher.png";
import createGroupLogo from "../../data/group.png";
import themeIcon from "../../data/day-and-night.png";
import logoutIcon from "../../data/exit.png";
import { BsChatText } from "react-icons/bs";
import { LuContact } from "react-icons/lu";
import { TbUsersPlus } from "react-icons/tb";


// images
import logo from "../../data/logo-no-background.png";
import { useEffect, useRef, useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import logoA from '../svg/logo.svg'

interface props {
  toggleNavDrawer: (val: string) => void;
  toggleGroupDrawer: () => void;
  toggleTheme: () => void;
  GroupdrawerOpen:boolean;
  isDark: boolean;
}


const Navbar = ({
  toggleNavDrawer,
  toggleGroupDrawer,
  toggleTheme,
  GroupdrawerOpen,
  isDark,
}: props) => {

  let logoRef = useRef(null);
  let FcSmsRef = useRef(null);
  let FcContactsRef = useRef(null);
  let GroupRef = useRef(null);
  let usersRef = useRef(null);
  let userInfoRef = useRef(null);

useEffect(()=>{

  const animation = gsap.to(logoRef.current,{
    duration: 2,
    rotate:360,
    delay:0.5,
    ease: "power2.inOut",
  })

  const navAnimation = gsap.from([FcSmsRef.current,FcContactsRef.current,GroupRef.current,usersRef.current,userInfoRef.current],{
    duration:1,
    x:100,
    stagger:0.3,
    
  })
  return ()=>{
    animation.kill();
    navAnimation.kill();
  }

},[])
const [activeNavItem, setActiveNavItem] = useState('chat');

  const handleNavItemClick = (item: string) => {
    setActiveNavItem(item);
    toggleNavDrawer(item);
  };
  const[isActive,setIsActive]=useState<any>({
    chatNav:true,
    contactNav:false,
    groupNav:false,
    userNav:false,
    infoNav:false,
  })

  const handleActive = (val:string)=>{
    setIsActive({
      chatNav:val==="chatNav",
      contactNav:val==="contactNav",
      groupNav:val==="groupNav",
      userNav:val==="userNav",
      infoNav:val==="infoNav",
    })


    if(GroupdrawerOpen){
      toggleGroupDrawer();
    }
  }

  return (
    <>
      <div className="h-screen overflow-y-hidden overflow-x-hidden sm:hidden xsm md:flex flex-col justify-between  transparent-bg ">
        <ul className="menu menu-vertical">
          <li ref={logoRef} >
            <div className="avatar placeholder bg-white" style={{margin:'-30px',padding:'20px'}}>
              <div className="logo m-auto text-center">
                <img
                  src={logoA}
                  alt=""
                  style={{ width: "80px" }}
                  className="m-auto pt-1 "
                />
              </div>
            </div>
          </li>
          <li ref={FcSmsRef} style={{marginTop:'30px'}} className={`${isActive.chatNav?"active":""}`} onClick={()=>handleActive('chatNav')}>
            <button
              className={`py-3 tooltip m-auto hover:bg-transparent focus:outline-none ${
                activeNavItem === 'chat' ? 'active' : ''
              }`}
              style={{
                background:'transparent',
                border: "none",
                boxShadow: "none",
                color: "inherit",
              }}
              data-tip="Chats"
              onClick={() => toggleNavDrawer("chat")}
            >
                <BsChatText className="lg:text-4xl md:text-2xl text-white"/> 
              {/* <FcSms className="lg:text-4xl md:text-2xl" /> */}
            </button>
          </li>
          <li  ref={FcContactsRef}  className={`${isActive.contactNav?"active":""}`} onClick={()=>handleActive('contactNav')}>
            <button
              className="py-3 tooltip m-auto hover:bg-transparent  focus:outline-none"
              style={{
               
                border: "none",
                boxShadow: "none",
                color: "inherit",
              }}
              data-tip="Contacts"
              onClick={() => toggleNavDrawer("contact") }
            >
           
            <LuContact className="lg:text-4xl md:text-2xl text-white"/>
              {/* <FcContacts className="lg:text-4xl md:text-2xl" /> */}
            </button>
          </li>
          <li ref={GroupRef} className={`${isActive.groupNav?"active":""}`} onClick={()=>handleActive('groupNav')}>
            <button
              className={`rounded tooltip m-auto  hover:bg-transparent focus:outline-none ${
                activeNavItem === 'search' ? 'active' : ''
              }`}
              style={{
                
                border: "none",
                boxShadow: "none",
                color: "inherit",
              }}
              data-tip="All Users"
              onClick={() => toggleNavDrawer("search")}
            >
              <TbUsersPlus className="lg:text-4xl md:text-2xl text-white"  />
            </button>
          </li>
          <li ref={usersRef} className={`${isActive.userNav?"active":""}`} onClick={()=>handleActive('userNav')}>
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
          <li ref={userInfoRef} className={`${isActive.infoNav?"active":""}`} onClick={()=>handleActive('infoNav')}>
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
              <FcPortraitMode  className="lg:text-4xl md:text-2xl" />
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
