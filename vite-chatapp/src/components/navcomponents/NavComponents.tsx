import { ChatGroup } from "../../interfaces/interfaces";
import AllChats from "../chatComponents/AllChats";
import UserDrawer from "../profileComponents/UserDrawer";
import UserSearch from "../SearchUsers";
import Contacts from "../Contacts";

interface Props {
  navDrawer: {
    chat: boolean;
    user: boolean;
    search: boolean;
    group: boolean;
    contacts: boolean;
  };
  upchatIndividualChat: (indiviualChat: ChatGroup | undefined) => void;
  toggleNavDrawer: (val: string) => void;
  updateChats: (val: ChatGroup) => void;
  chatData: ChatGroup[];
}

function NavComponents({
  navDrawer,
  upchatIndividualChat,
  toggleNavDrawer,
  updateChats,
  chatData,
}: Props) {
  // Determine which mode is active
  let activeMode = "";
  if (navDrawer.chat) {
    activeMode = "chat";
  } else if (navDrawer.user) {
    activeMode = "user";
  } else if (navDrawer.search) {
    activeMode = "search";
  } else if (navDrawer.contacts) {
    activeMode = "contact";
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
      return (
        <UserSearch
          updateChats={updateChats}
          toggleNavDrawer={toggleNavDrawer}
        />
      );
    case "contact":
      return (
        <Contacts updateChats={updateChats} toggleNavDrawer={toggleNavDrawer} />
      );

    default:
      return null;
  }
}

export default NavComponents;
