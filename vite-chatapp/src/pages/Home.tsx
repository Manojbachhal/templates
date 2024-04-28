// hooks
import { useCallback, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { ChatGroup } from "../interfaces/interfaces";

//components
import GroupsDrawer from "../components/Models/GroupsModal";
import MessageBox from "../components/MessageBox";
import NavComponents from "../components/navcomponents/NavComponents";

//redux
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { signOut } from "../redux/auth/auth.action";
import { getChats } from "../redux/chats/chatAction";
import Navbar from "../components/navcomponents/Navbar";

function Dashboard() {
  //react hooks
  const [isDark, setIsDark] = useState(() => {
    const theme = localStorage.getItem("isDark");
    return theme !== null ? JSON.parse(theme) : false;
  });
  const [chatData, setChatData] = useState<ChatGroup[] | []>([]);
  const [selectedChat, setIndivisualChat] = useState<ChatGroup | undefined>(
    undefined
  );
  const Router = useNavigate();
  // drawers
  const [GroupdrawerOpen, setGroupDrawerOpen] = useState(false);
  //  nav bar
  const [navDrawer, setNavDrawer] = useState({
    chat: true,
    user: false,
    search: false,
    group: false,
    contacts: false,
  });

  // redux
  const userAuth = useAppSelector((store) => store.auth.isLogin);
  const dispatch = useAppDispatch();

  // fns
  console.log(isDark);
  // theme
  const toggleTheme = () => {
    localStorage.setItem("isDark", JSON.stringify(!isDark));
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  // chat all chat conversations

  const getChatsData = async () => {
    let res = await getChats("/api/");
    console.log(res);
    setChatData(res);
  };

  // update chats
  const updateChats = (newChat: ChatGroup) => {
    setChatData((prev) => {
      if (prev === undefined) {
        return [newChat];
      } else {
        return [newChat, ...prev];
      }
    });
  };

  // group drawer visibilty
  const toggleGroupDrawer = useCallback(() => {
    setGroupDrawerOpen(!GroupdrawerOpen);
  }, [GroupdrawerOpen]);

  // navigation
  const toggleNavDrawer = (mode: string) => {
    setNavDrawer((prevState) => ({
      ...prevState,
      chat: mode === "chat" ? true : false,
      user: mode === "user" ? true : false,
      search: mode === "search" ? true : false,
      contacts: mode === "contact" ? true : false,
      group: mode === "group" ? true : false,
    }));
  };

  // update single chat for chatbox
  const upchatIndividualChat = useCallback(
    (indiviualChat: ChatGroup | undefined) => {
      setIndivisualChat(indiviualChat);
    },
    [selectedChat]
  );

  // singout fn
  const handleSignout = async () => {
    await dispatch<any>(signOut());
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);
  useEffect(() => {
    getChatsData();
  }, []);

  useEffect(() => {
    if (!userAuth && window.location.pathname !== "/login") {
      Router("/login");
    }
  }, [userAuth]);

  return (
    <>
      <GroupsDrawer
        GroupdrawerOpen={GroupdrawerOpen}
        toggleGroupDrawer={toggleGroupDrawer}
        updateChats={updateChats}
      />

      <div className="flex dark:bg-black">
        {/* navigation */}

        <Navbar
          toggleNavDrawer={toggleNavDrawer}
          toggleGroupDrawer={toggleGroupDrawer}
          toggleTheme={toggleTheme}
          isDark={isDark}
        />

        <div className="h-screen md:w-1/3 border-3 shadow-right bg-orange-500 dark:bg-black">
          <NavComponents
            navDrawer={navDrawer}
            upchatIndividualChat={upchatIndividualChat}
            toggleNavDrawer={toggleNavDrawer}
            chatData={chatData}
            updateChats={updateChats}
          />
        </div>

        <div className="w-2/3 h-screen  shadow-inner dark:bg-black">
          <MessageBox selectedChat={selectedChat} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;