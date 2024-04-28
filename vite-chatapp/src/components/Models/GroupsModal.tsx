import React, { useEffect, useRef, useState } from "react";

//icons
import { HiOutlineUserGroup } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";

import { ChatGroup, User } from "../../interfaces/interfaces";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createGroup } from "../../redux/chats/chatAction";
import Loader from "../svg/Loader";

interface GroupDrawer {
  GroupdrawerOpen: boolean;
  toggleGroupDrawer: () => void;
  updateChats: (val: ChatGroup) => void;
}

function GroupDrawer({
  GroupdrawerOpen,
  toggleGroupDrawer,
  updateChats,
}: GroupDrawer) {
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
    document.getElementById(removedUser._id)?.classList.remove("bg-green-300");
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

  const handleCreateGroupChat = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (groupRef.current) {
      let groupname = groupRef.current.value;
      let users = JSON.stringify(groupUsers);

      let res = await createGroup(groupname, users);
      console.log(res?.data);
      updateChats(res?.data);
      toggleGroupDrawer();
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
          ? "fixed side-drawer overflow-y-scroll custom-scrollbar left-1/4 top-14 bottom-14 z-40 shadow-lg w-1/2 bg-orange-300 dark:bg-black"
          : "hidden"
      }
      id="drawer-example"
      aria-labelledby="drawer-label"
    >
      <div className="h-full">
        {/* heading  */}
        <div className="p-2 m-2 h-20 transparent-bg flex align-items-center">
          <h5
            id="drawer-label"
            className="inline-flex text-3xl text-white dark:text-blue-600 items-center mb-4 font-semibold "
          >
            <HiOutlineUserGroup className="me-3" />
            Create Group Chat
          </h5>
          <button
            type="button"
            onClick={toggleGroupDrawer} // Close the drawer on button click
            className="dark:bg-black bg-slate-800  hover:bg-white dark:hover:bg-white  text-sm w-8 h-8 absolute end-4 flex items-center justify-center "
          >
            <RxCross2 className="text-lg text-gray-300 dark:text-white hover:text-black dark:hover:text-black " />
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-3 px-4 py-2 w-full side-drawer">
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
        {/* form content */}
        <div className="p-4 relative side-drawer">
          <form
            id="groupForm"
            className="max-w-lg mx-auto border-2 border-b-0 border-r-0 border-l-0 rounded bg-white"
            onSubmit={handleCreateGroupChat}
          >
            <div className="w-full">
              <div className="mx-2">
                <label
                  htmlFor="groupname"
                  className="block p-2 text-xl text-blue-600 font-bold mb-2"
                >
                  Group Name
                </label>
                <input
                  type="text"
                  id="groupname"
                  name="group name"
                  className="pl-4 block p-2.5 pr-9 w-full z-20 text-sm bg-slate-200 text-gray-900 rounded border-2 focus:outline-none"
                  placeholder="Enter Group Name"
                  required
                  ref={groupRef}
                />
              </div>
              <div>
                <button
                  className=" bg-blue-600 text-white  p-2.5 m-3 "
                  onClick={() => setisMembersVisible(!isMembersVisible)}
                >
                  Click to Add Group Members
                </button>
                <div
                  className={`${
                    !isMembersVisible ? "hidden" : ""
                  } h-3/5 pt-3 group-members `}
                >
                  <div className="mx-1 mb-3 ">
                    <input
                      type="text"
                      id="group-members"
                      className="pl-4 block w-5/6 m-auto p-2.5 z-20 text-sm text-gray-900 border-2 focus:outline-none"
                      placeholder="Search Group Member"
                      // required
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
                          id={user._id}
                          onClick={(e) => {
                            e.currentTarget.classList.add("bg-green-300");
                            handleGroupUsers(user);
                          }}
                        >
                          <div className="w-1/5">
                            <img
                              src={user.pic}
                              alt=""
                              width={"70%"}
                              className="rounded-full"
                            />
                          </div>
                          <div className="w-3/4">
                            <p className="text-sm font-bold capitalize">
                              {user.name}
                            </p>
                            <p className="text-xs capitalize ">
                              <b>Email:</b>
                              <span className="text-gray-500">
                                {user.email}
                              </span>
                            </p>
                          </div>
                          <div></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex justify-end p-3">
                <button type="submit" className="bg-blue-600 text-white p-2.5 ">
                  Create Group
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* {Loading ? (
          <div className="absolute top-1/2 right-1/2">
            <Loader />{" "}
          </div>
        ) : (
          ""
        )} */}
      </div>
    </div>
  );
}

export default React.memo(GroupDrawer);
