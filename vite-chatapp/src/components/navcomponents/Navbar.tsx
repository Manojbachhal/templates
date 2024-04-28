import { RiUserSearchLine } from "react-icons/ri";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

import { IoMoonOutline } from "react-icons/io5";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { FcSms } from "react-icons/fc";
import { FcContacts } from "react-icons/fc";
import { FcPortraitMode } from "react-icons/fc";
import userSearchLogo from "../../data/researcher.png";
import createGroupLogo from "../../data/group.png";
import themeIcon from "../../data/day-and-night.png";
import logoutIcon from "../../data/exit.png";

// images
import logo from "../../data/logo-no-background.png";
import { useState } from "react";

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
  return (
    <>
      <div className="h-screen overflow-y-hidden overflow-x-hidden sm:hidden xsm md:flex flex-col justify-between bg-base-200">
        <ul className="menu menu-vertical">
          <li>
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
          <li>
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
              <FcSms className="fs-icons " />
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
              data-tip="Contacts"
              onClick={() => toggleNavDrawer("contact")}
            >
              <FcContacts className="fs-icons" />
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
              data-tip="All Users"
              onClick={() => toggleNavDrawer("search")}
            >
              <img src={userSearchLogo} alt="" style={{ width: "25px" }} />
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
              data-tip="Create Group"
              onClick={() => toggleGroupDrawer()}
            >
              <img src={createGroupLogo} alt="" style={{ width: "25px" }} />

              {/* <AiOutlineUsergroupAdd className="fs-icons" /> */}
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
              data-tip="user Info"
              onClick={() => toggleNavDrawer("user")}
            >
              <FcPortraitMode className="fs-icons" />
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
