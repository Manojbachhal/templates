import React from "react";
import { RxCross2 } from "react-icons/rx";
import { ChatGroup } from "../../interfaces/interfaces";
import { MdModeEditOutline } from "react-icons/md";

interface Pros {
  // chatHeaderDrawer: Boolean;
  togglechatHeaderDrawer: () => void;
  selectedChat: ChatGroup | undefined;
}

function ChatDetails({ togglechatHeaderDrawer, selectedChat }: Pros) {
  return (
    <div className={"transparent-bg  h-full"}>
      <div className="info-header h-1/3 ">
        {/* header */}
        <div className="ps-2 h-20 flex align-items-center border-b-4 border-blue-600">
          <h5
            id="drawer-label"
            className="text-5xl text-black m-auto mb-6 pl-3 "
          >
            {selectedChat?.isGroupChat ? "Group info" : "Contact info"}
          </h5>
          <button
            type="button"
            onClick={togglechatHeaderDrawer} // Close the drawer on button click
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 w-8 h-8 absolute end-2.5 flex items-center justify-center"
          >
            <RxCross2 className="text-lg" />
          </button>
        </div>

        {/* profile pic section */}

        <div className="border-gray-200 chat-deatils-header">
          <div>
            <img
              src={
                selectedChat?.isGroupChat
                  ? selectedChat?.groupPic
                  : selectedChat?.users[1].pic
              }
              width={"50%"}
              className="m-auto rounded-2xl "
              alt=""
            />

            <div className="flex pt-3 items-center justify-center ">
              <p className="text-white text-3xl ">
                {selectedChat?.isGroupChat
                  ? selectedChat.chatName
                  : selectedChat?.name}
              </p>
              {selectedChat?.isGroupChat ? (
                <MdModeEditOutline className="ml-3 text-2xl text-white" />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Group members section */}
      <div className="info-body h-2/3">
        <div className="text-center pt-1 pb-3 ">
          {selectedChat?.isGroupChat ? (
            <p className="text-gray-300 text-1xl">
              Group : {selectedChat?.users.length}
              <span> members</span>
            </p>
          ) : (
            <p className="text-white text-3xl ">
              {selectedChat?.users[1].name}
            </p>
          )}
        </div>

        <div className="chat-deatils-body">
          {selectedChat?.isGroupChat ? (
            <div className="p-3.5">
              <p className="text-gray-300 text-1xl">
                {selectedChat?.users.length}
                <span> members</span>
              </p>
              <div className="">
                {selectedChat?.users?.map((currentMember) => {
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

export default React.memo(ChatDetails);
