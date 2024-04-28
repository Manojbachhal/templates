import React from "react";
import { RxCross2 } from "react-icons/rx";
import { ChatGroup } from "../interfaces/interfaces";
import { MdModeEditOutline } from "react-icons/md";

interface Pros {
  chatHeaderDrawer: Boolean;
  togglechatHeaderDrawer: () => void;
  indivisualChat: ChatGroup | undefined;
}

function ChatHeaderDrawer({
  chatHeaderDrawer,
  togglechatHeaderDrawer,
  indivisualChat,
}: Pros) {
  return (
    <div
      className={
        chatHeaderDrawer
          ? "fixed top-0 border-r-2 right-0 z-40 h-screen overflow-y-scroll custom-scrollbar transition-transform translate-x-0 bg-white w-2/5 dark:bg-gray-800"
          : "hidden"
      }
      id="drawer-example"
      aria-labelledby="drawer-label"
    >
      <div className="auth-bg ps-2 h-20 flex align-items-center">
        <h5
          id="drawer-label"
          className="inline-flex text-2xl text-white items-center mb-4 pl-3"
        >
          {indivisualChat?.isGroupChat ? "Group info" : "Contact info"}
        </h5>
        <button
          type="button"
          onClick={togglechatHeaderDrawer} // Close the drawer on button click
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <RxCross2 className="text-lg" />
        </button>
      </div>
      <div className="pt-3 side-drawer h-full">
        <div className="border-b-8 border-gray-200 chat-deatils-header">
          <img
            src={
              indivisualChat?.isGroupChat
                ? indivisualChat?.groupPic
                : indivisualChat?.users[1].pic
            }
            width={"50%"}
            className="m-auto rounded-2xl "
            alt=""
          />

          <div className="flex pt-3 items-center justify-center ">
            <p className="text-white text-3xl ">
              {indivisualChat?.isGroupChat
                ? indivisualChat.chatName
                : indivisualChat?.name}
            </p>
            {indivisualChat?.isGroupChat ? (
              <MdModeEditOutline className="ml-3 text-2xl text-white" />
            ) : (
              ""
            )}
          </div>
          <div className="text-center pt-1 pb-3">
            {indivisualChat?.isGroupChat ? (
              <p className="text-gray-300 text-1xl">
                Group : {indivisualChat?.users.length}
                <span> members</span>
              </p>
            ) : (
              <p className="text-white text-3xl ">
                {indivisualChat?.users[1].name}
              </p>
            )}
          </div>
        </div>
        <div className="chat-deatils-body">
          {indivisualChat?.isGroupChat ? (
            <div className="p-3.5">
              <p className="text-gray-300 text-1xl">
                {indivisualChat?.users.length}
                <span> members</span>
              </p>
              <div className="">
                {indivisualChat?.users?.map((currentMember) => {
                  return (
                    <div className="flex my-2">
                      <img
                        src={currentMember.pic}
                        width={"40px"}
                        className="rounded-full"
                        alt=""
                      />
                      <p className="ms-3 text-white">{currentMember.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(ChatHeaderDrawer);
