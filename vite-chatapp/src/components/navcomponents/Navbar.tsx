import gsap from "gsap";
import { FcSms } from "react-icons/fc";
import { FcContacts } from "react-icons/fc";
import { FcPortraitMode } from "react-icons/fc";
import userSearchLogo from "../../data/researcher.png";
import createGroupLogo from "../../data/group.png";
import themeIcon from "../../data/day-and-night.png";
import logoutIcon from "../../data/exit.png";

// images
import logo from "../../data/logo-no-background.png";
import { useEffect, useRef, useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

interface props {
  toggleNavDrawer: (val: string) => void;
  toggleGroupDrawer: () => void;
  toggleTheme: () => void;
  isDark: boolean;
}


const Navbar = ({
  toggleNavDrawer,
  toggleGroupDrawer,
  toggleTheme,
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
    duration: 1,
    rotate:360,
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
  return (
    <>
      <div className="h-screen overflow-y-hidden overflow-x-hidden sm:hidden xsm md:flex flex-col justify-between  transparent-bg ">
        <ul className="menu menu-vertical">
          <li ref={logoRef}>
            <div className="avatar placeholder">
              <div className="logo m-auto text-center">
                <img
                  src={logo}
                  alt=""
                  style={{ width: "50px" }}
                  className="m-auto pt-1 rounded-full"
                />
              </div>
            </div>
          </li>
          <li ref={FcSmsRef}>
            <button
              className="py-3 tooltip m-auto hover:bg-transparent focus:outline-none"
              style={{
                background: "transparent",
                border: "none",
                boxShadow: "none",
                color: "inherit",
              }}
              data-tip="Chats"
              onClick={() => toggleNavDrawer("chat")}
            >
              <FcSms className="lg:text-4xl md:text-2xl" />
            </button>
          </li>
          <li  ref={FcContactsRef}>
            <button
              className="py-3 tooltip m-auto hover:bg-transparent focus:outline-none"
              style={{
                background: "transparent",
                border: "none",
                boxShadow: "none",
                color: "inherit",
              }}
              data-tip="Contacts"
              onClick={() => toggleNavDrawer("contact")}
            >
              <FcContacts className="lg:text-4xl md:text-2xl" />
            </button>
          </li>
          <li ref={GroupRef}>
            <button
              className="py-3 tooltip m-auto hover:bg-transparent focus:outline-none"
              style={{
                background: "transparent",
                border: "none",
                boxShadow: "none",
                color: "inherit",
              }}
              data-tip="All Users"
              onClick={() => toggleNavDrawer("search")}
            >
              <img src={userSearchLogo} alt="" style={{ width: "25px" }}  />
            </button>
          </li>
          <li ref={usersRef}>
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
              {/* <img src={createGroupLogo} alt="" style={{ width: "25px" }} /> */}

              <AiOutlineUsergroupAdd className="fs-icons text-green-400 " />
            </button>
          </li>
          <li ref={userInfoRef}>
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
