// hooks
import { useCallback, useEffect, useState } from "react";
import { hasCookie } from "cookies-next";

// icons
import { FaUserAstronaut } from "react-icons/fa";
import { IoArchiveOutline, IoMoonOutline } from "react-icons/io5";
import { RiUserSearchLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { FiMessageCircle } from "react-icons/fi";

// axios and components
import SidebarSearch from "../components/SidebarSearch";

// interfaces
import { ChatGroup } from "../interfaces/interfaces";
import GroupsDrawer from "../components/GroupsDrawer";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getChats } from "../redux/chats/chatAction";
import AllChats from "../components/AllChats";
import MessageBox from "../components/MessageBox";
import UserDrawer from "../components/UserDrawer";
import NavComponents from "../components/navcomponents/NavComponents";

function Dashboard() {
  // react hooks
  const [chatData, setChatData] = useState<ChatGroup[] | undefined>(
    useAppSelector((store) => store.chats.chats) || undefined
  );
  const [indivisualChat, setIndivisualChat] = useState<ChatGroup | undefined>(
    undefined
  );
  const [activeMode, setActiveMode] = useState("chat");
  const Router = useNavigate();

  // Redux hooks
  const dispatch = useAppDispatch();

  // drawers

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [GroupdrawerOpen, setGroupDrawerOpen] = useState(false);
  const [userdrawerOpen, setUserDrawerOpen] = useState(false);
  const [navDrawer, setNavDrawer] = useState({
    chat: true,
    user: false,
    search: false,
    group: false,
  });
  console.log(navDrawer);

  const toggleDrawer = useCallback(() => {
    setDrawerOpen(!drawerOpen);
  }, [drawerOpen]);

  const toggleGroupDrawer = useCallback(() => {
    setGroupDrawerOpen(!GroupdrawerOpen);
  }, [GroupdrawerOpen]);

  const toggleUserDrawer = useCallback(() => {
    setUserDrawerOpen(!userdrawerOpen);
  }, [userdrawerOpen]);

  const toggleNavDrawer = (mode: string) => {
    setNavDrawer((prevState) => ({
      ...prevState,
      chat: mode === "chat" ? true : false,
      user: mode === "user" ? true : false,
      search: mode === "search" ? true : false,
      group: mode === "group" ? true : false,
    }));

    setActiveMode(mode);
  };

  // chat box data

  const upchatIndividualChat = useCallback(
    (indiviualChat: ChatGroup | undefined) => {
      console.log(indivisualChat);
      setIndivisualChat(indiviualChat);
    },
    [indivisualChat]
  );

  const userAuth = hasCookie("isLogin");
  if (!userAuth) {
    Router("/login");
  }

  const updateChats = () => {
    setChatData(chatData);
  };

  //  get all chat message of specific user
  const getAllMessage = async () => {
    await dispatch<any>(getChats("/api/"));
  };
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    getAllMessage();
  }, []);

  return (
    <>
      <GroupsDrawer
        GroupdrawerOpen={GroupdrawerOpen}
        toggleGroupDrawer={toggleGroupDrawer}
        updateChats={updateChats}
      />
      {/* <UserDrawer
        userdrawerOpen={userdrawerOpen}
        toggleUserDrawer={toggleUserDrawer}
      /> */}

      <div className="flex h-screen">
        <div
          className="w-1/12 h-full  dark:bg-black"
          style={{ height: "100vh" }}
        >
          <nav className="navigation">
            <div className="logo m-auto text-center">
              <img
                src="https://i.pinimg.com/564x/64/c5/21/64c521928bd358147d203b3a8ab3fe0f.jpg"
                alt=""
                width="50px"
                className="m-auto pt-1 rounded-full"
              />
            </div>
            <div
              className="nav-group h-3/4 flex flex-col justify-around"
              style={{ height: "80vh" }}
            >
              <div className="user-link text-center">
                <button className="py-3">
                  <FiMessageCircle
                    className="fs-icons"
                    onClick={() => toggleNavDrawer("chat")}
                  />
                </button>

                <br />
                <button className="py-3">
                  <FaUserAstronaut
                    className="fs-icons"
                    onClick={() => toggleNavDrawer("user")}
                  />
                </button>
                <br />

                <button
                  className="py-3"
                  onClick={() => toggleNavDrawer("search")}
                >
                  <RiUserSearchLine className="fs-icons" />
                </button>
                {/* <br /> */}
                {/* <button
                  className="py-3"
                  
                  onClick={toggleUserDrawer}
                >
                  <RiUserSearchLine className="fs-icons" />
                </button> */}

                {/* <button></button> */}
                <br />

                <button className="py-3" onClick={toggleGroupDrawer}>
                  <HiOutlineUserGroup className="fs-icons" />
                </button>
                <br />

                <button className="py-3">
                  <IoArchiveOutline className="fs-icons" />
                </button>
                <br />
              </div>
              <div className="theme text-center" onClick={toggleTheme}>
                <button>
                  <IoMoonOutline className="fs-icons" />
                </button>
              </div>
            </div>
          </nav>
        </div>

        {/* <AllChats
          chatData={chatData}
          upchatIndividualChat={upchatIndividualChat}
        /> */}

        {/* <SidebarSearch
          drawerOpen={drawerOpen}
          toggleDrawer={toggleDrawer}
          updateChats={updateChats}
        /> */}
        <div className="w-1/3 border-3 side-drawer dark:bg-black">
          <NavComponents navDrawer={navDrawer} />
        </div>

        <div className="w-2/3 ">
          <MessageBox indivisualChat={indivisualChat} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
