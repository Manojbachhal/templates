import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { ChatGroup } from "../../interfaces/interfaces";
import SkeletonLoading from "../SkeletonLoading";

interface props {
  upchatIndividualChat: (val: ChatGroup | undefined) => void;
  chatData: ChatGroup[] | undefined;
}
function AllChats({ upchatIndividualChat, chatData }: props) {
  const [contentHeight, setContentHeight] = useState(480);

  // Calculate the height of the content
  useEffect(() => {
    const contentElement = document.querySelector(".recent-chats");
    if (contentElement) {
      const height = contentElement.scrollHeight;
      setContentHeight(height);
    }
  }, []);

  // logged in user
  const currentUser = useAppSelector((store: any) => store.auth.user);

  return (
    <div className="p-2 mx-1 transparent-bg h-full overflow-hidden">
      <div
        className="pt-2 flex transparent-bg align-items-center"
        style={{ height: "12%" }}
      >
        <h5 className="inline-flex px-3 text-3xl text-white items-center mb-4 font-semibold ">
          Chats
        </h5>
      </div>

      <p className="text-2xl font-thin text-white px-2">Recent</p>
      {chatData?.length === 0 ? (
        <SkeletonLoading />
      ) : (
        <div
          className={`p-2 mb-5  custom-scrollbar overflow-y-scroll recent-chats`}
          style={{ height: "85%", display: "flex", flexDirection: "column" }}
        >
          {chatData?.map((chat: ChatGroup, index: number) => {
            return chat.isGroupChat ? (
              <div
                key={chat._id}
                className="p-3 my-2 mx-3 contact-bg"
                onClick={() => upchatIndividualChat(chat)}
              >
                <div className="hover:cursor-pointer flex align-center">
                  <img src={chat.groupPic} alt="" width={"30%"} className="" />

                  <div className="ps-2">
                    <p className="px-2 text-white uppercase">{chat.chatName}</p>
                    <p className="px-2 text-sm text-gray-600 dark:text-blue-600 ">
                      {chat.latestMessage?.content}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {chat.users?.map((user) => {
                  return (
                    user._id !== currentUser._id && (
                      <div
                        key={index}
                        className="p-3 my-2 mx-3 contact-bg"
                        onClick={async () => {
                          upchatIndividualChat(chat);
                        }}
                      >
                        <div
                          key={user._id}
                          className="flex hover:cursor-pointer"
                        >
                          <img
                            src={user.pic}
                            alt=""
                            width={"40px"}
                            className="rounded-full"
                          />
                          <div className="ps-2">
                            <p className="px-2 text-white uppercase">
                              {user.name}
                            </p>
                            <p className="px-2 text-sm text-gray-600 dark:text-blue-600 ">
                              {chat.latestMessage?.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  );
                })}
              </>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AllChats;
