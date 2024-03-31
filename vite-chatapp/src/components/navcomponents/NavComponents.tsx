import React, { useCallback, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { ChatGroup } from "../../interfaces/interfaces";
import AllChats from "../AllChats";
import UserDrawer from "../UserDrawer";
import SidebarSearch from "../SidebarSearch";

interface Props {
  navDrawer: {
    chat: boolean;
    user: boolean;
    search: boolean;
    group: boolean;
  };
  // toggleNavDrawer: () => void;
}

function NavComponents({ navDrawer }: Props) {
  //
  const [chatData, setChatData] = useState<ChatGroup[] | undefined>(
    useAppSelector((store) => store.chats.chats) || undefined
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [GroupdrawerOpen, setGroupDrawerOpen] = useState(false);

  const [indivisualChat, setIndivisualChat] = useState<ChatGroup | undefined>(
    undefined
  );
  const toggleDrawer = useCallback(() => {
    setDrawerOpen(!drawerOpen);
  }, [drawerOpen]);
  const upchatIndividualChat = useCallback(
    (indiviualChat: ChatGroup | undefined) => {
      console.log(indivisualChat);
      setIndivisualChat(indiviualChat);
    },
    [indivisualChat]
  );
  const updateChats = () => {
    setChatData(chatData);
  };

  // Determine which mode is active
  let activeMode = "";
  if (navDrawer.chat) {
    activeMode = "chat";
  } else if (navDrawer.user) {
    activeMode = "user";
  } else if (navDrawer.search) {
    activeMode = "search";
  } else if (navDrawer.group) {
    activeMode = "group";
  }

  // Render component based on active mode
  switch (activeMode) {
    case "chat":
      return (
        <AllChats
          chatData={chatData}
          upchatIndividualChat={upchatIndividualChat}
        />
      );
    case "user":
      return <UserDrawer />;
    case "search":
      return <SidebarSearch updateChats={updateChats} />;
    case "group":
      return <div>Group Component</div>;
    default:
      return null;
  }
}

export default NavComponents;
