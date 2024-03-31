import React, { useEffect, useRef, useState } from "react";

//icons
import { HiOutlineUserGroup } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";

import { ChatGroup, User } from "../interfaces/interfaces";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { createGroup } from "../redux/chats/chatAction";
import Loader from "./Loader";

interface GroupDrawer {
  GroupdrawerOpen: boolean;
  toggleGroupDrawer: () => void;
  updateChats: (val: ChatGroup[] | undefined) => void;
}

function GroupDrawer({ GroupdrawerOpen, toggleGroupDrawer }: GroupDrawer) {
  const [isMembersVisible, setisMembersVisible] = useState(false);
  const [allUsers, setAllusers] = useState<User[]>();
  const [groupUsers, setGroupUsers] = useState<User[]>([]);
  const [contentHeightGroups, setContentHeight] = useState(100);
  // redux hookes
  const dispatch = useAppDispatch();
  const usersData = useAppSelector((storedData) => storedData.user.users);
  let Loading = useAppSelector((store) => store.chats.loading);

  // input hooks
  const searchRef = useRef<HTMLInputElement>(null);
  const groupRef = useRef<HTMLInputElement>(null);

  // debouncing
  let debouncingId: NodeJS.Timeout | undefined = undefined;

  const apiCall = async (url: String) => {
    try {
      let token = getCookie("Token");
      let res = await axios.get(`${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleGroupUsers = (newMember: User) => {
    const check = groupUsers.find((curr) => curr._id === newMember._id);
    if (!check)
      setGroupUsers((prevGroupUsers) => [...prevGroupUsers, newMember]);
  };

  const handleRemoveGroupUser = (removedUser: User) => {
    setGroupUsers((prevGroupUser) =>
      prevGroupUser.filter((user) => user !== removedUser)
    );
  };

  // debouncing search
  const debouncing = (
    e: React.FormEvent<HTMLFormElement | HTMLInputElement>
  ) => {
    e.preventDefault();
    if (searchRef.current === null) {
      setAllusers(usersData);
    }
    if (debouncingId) {
      clearInterval(debouncingId);
    }
    debouncingId = setTimeout(async () => {
      if (searchRef.current) {
        let response = await apiCall(
          `http://localhost:3001/users?search=${searchRef.current.value}`
        );

        setAllusers(response);
      }
    }, 1000);
  };

  // get all users
  const getAllUsers = async () => {
    let response = await apiCall("http://localhost:3001/users/allusers");
    setAllusers(response);
  };

  const handleCreateGroupChat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (groupRef.current) {
      let groupname = groupRef.current.value;
      let users = JSON.stringify(groupUsers);

      dispatch<any>(createGroup(groupname, users));
    }
  };

  useEffect(() => {
    if (GroupdrawerOpen) {
      // console.log(allUsers);
      getAllUsers();
    }
    const contentElement = document.querySelector(".group-members");
    if (contentElement) {
      const height = contentElement.scrollHeight;
      setContentHeight(height);
    }
  }, [GroupdrawerOpen]);

  return (
    <div
      className={
        GroupdrawerOpen
          ? "fixed side-drawer overflow-y-scroll custom-scrollbar top-0 left-0 z-40 h-screen transition-transform translate-x-0 bg-white w-96 dark:bg-gray-800"
          : "hidden"
      }
      id="drawer-example"
      aria-labelledby="drawer-label"
    >
      {/* heading  */}
      <div className="auth-bg ps-2 h-20 flex align-items-center">
        <h5
          id="drawer-label"
          className="inline-flex text-3xl text-white items-center mb-4 font-semibold "
        >
          <HiOutlineUserGroup className="me-3" />
          Create Group Chat
        </h5>
        <button
          type="button"
          onClick={toggleGroupDrawer} // Close the drawer on button click
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3 text-gray-700"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
      </div>

      {/* form content */}
      <div className="p-4 relative side-drawer">
        <form
          id="groupForm"
          className="max-w-lg mx-auto border-2 border-b-0 border-r-0 border-l-0 rounded bg-white"
          onSubmit={handleCreateGroupChat}
        >
          <div className="w-full">
            <div>
              <label
                htmlFor="groupname"
                className="block px-2 text-gray-700 font-bold mb-2"
              >
                Group Name
              </label>
              <input
                type="text"
                id="groupname"
                className="pl-4 block p-2.5 pr-9 w-full z-20 text-sm text-gray-900 rounded border-2 focus:outline-none"
                placeholder="Enter Group Name"
                required
                ref={groupRef}
              />
            </div>

            <div className="flex">
              <button type="submit" className="bg-blue-600 text-white p-2.5 ">
                Create Group
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="flex flex-wrap gap-3 p-1 w-full side-drawer">
        {groupUsers?.map((currUser) => {
          return (
            <button
              key={currUser._id}
              onClick={() => handleRemoveGroupUser(currUser)}
              className="bg-fuchsia-600 p-1 rounded text-white text-xs flex"
            >
              {currUser.name}
              <RxCross2 className="ml-2" />
            </button>
          );
        })}
      </div>

      {/* group members */}
      <div className=" p-3.5 pt-2 ">
        <button
          className=" bg-blue-600 text-white p-2.5"
          onClick={() => setisMembersVisible(!isMembersVisible)}
        >
          Click to Add Group Members
        </button>

        <div
          className={`${
            !isMembersVisible ? "hidden" : ""
          } h-3/5 pt-3 group-members `}
        >
          <div className="mx-1 mb-3 border-2">
            <input
              type="text"
              id="group-members"
              className="pl-4 block p-2.5 w-full z-20 text-sm text-gray-900 border-2 focus:outline-none"
              placeholder="Search Group Member"
              required
              onChange={debouncing}
              ref={searchRef}
            />
          </div>
          <div
            className={`${
              contentHeightGroups > 100
                ? "overflow-y-scroll custom-scrollbar"
                : "overflow-y-hidden"
            }`}
          >
            {allUsers?.map((user) => {
              return (
                <div
                  className="flex w-5/6 m-auto items-center mb-3 border-2 px-2 py-1 rounded bg-gray-200 hover:cursor-pointer"
                  key={user._id}
                  onClick={() => handleGroupUsers(user)}
                >
                  <div className="w-1/4">
                    <img
                      src={user.pic}
                      alt=""
                      width={"70%"}
                      className="rounded-full"
                    />
                  </div>
                  <div className="w-3/4">
                    <p className="text-sm font-bold capitalize">{user.name}</p>
                    <p className="text-xs capitalize ">
                      <b>Email:</b>
                      <span className="text-gray-500">{user.email}</span>
                    </p>
                  </div>
                  <div></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {Loading ? (
        <div className="absolute top-1/2 right-1/2">
          <Loader />{" "}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default React.memo(GroupDrawer);
