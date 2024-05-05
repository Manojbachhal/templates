import React, { useEffect, useRef, useState } from "react";
import { ChatGroup, User } from "../interfaces/interfaces";
import axios from "axios";
import { getCookie } from "cookies-next";
import { getUsers, getUsersDebouncing } from "../redux/users/getUsersAction";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getChats } from "../redux/chats/chatAction";
import Loader from "./svg/Loading";
import { GrUserAdd } from "react-icons/gr";

interface props {
  toggleNavDrawer: (val: string) => void;
  updateChats: (val: ChatGroup) => void;
}

function UserSearch({ toggleNavDrawer }: props) {
  let Loading = useAppSelector((store) => store.user.loading);
  const [allUsers, setAllusers] = useState<User[]>();
  const searchRef = useRef<HTMLInputElement>(null);
  let debouncingId: NodeJS.Timeout | undefined = undefined;
  const dispatch = useAppDispatch();
  const usersData = useAppSelector((storedData) => storedData.user.users);

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
        try {
          const url = `http://localhost:3001/users?search=${searchRef.current.value}`;
          let token = getCookie("Token");
          let res = await axios.get(`${url}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          let data = await res.data;
          setAllusers(data);
        } catch (error) {}
      }
    }, 1000);
  };

  // get all users
  const getAllUsers = async () => {
    await dispatch<any>(getUsers("/users/allusers"));
    setAllusers(usersData);
  };

  const addContact = async (id: string) => {
    try {
      const url = `http://localhost:3001/api/contacts`;
      let token = getCookie("Token");
      const res = await axios.post(
        url,
        { userId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res);
      if (res.status === 200) {
        toggleNavDrawer("contact");
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="p-2 h-90-percent">
      <div className="transparent-bg h-20 flex align-items-center">
        <h5
          id="drawer-label"
          className="inline-flex px-3 text-3xl text-white items-center mb-4 font-semibold "
        >
          Search Users
        </h5>
      </div>

      <div className="p-4">
        <form
          className="max-w-lg mx-auto border-2  rounded "
          onSubmit={debouncing}
        >
          <div className="relative w-full">
            <input
              type="search"
              id="search"
              className="pl-4 block p-2.5 pr-9 w-full z-20 text-sm text-gray-900 rounded  border-2 focus:outline-none"
              placeholder="Search user"
              required
              ref={searchRef}
              onChange={debouncing}
            />
            <button
              type="submit"
              className="absolute bg-gray-200 top-0 border-s-2 border-gray-300 end-0 p-2.5 text-sm font-medium h-full text-slate-700 "
            >
              <svg
                className="w-4 h-4 bg-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </form>
      </div>
      {Loading ? (
        <div className="flex align-items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="pt-3 overflow-y-scroll custom-scrollbar">
          {allUsers?.map((user) => {
            return (
              <div
                className="flex w-5/6 m-auto items-center mb-3 p-2 rounded contact-bg text-white hover:cursor-pointer glass "
                key={user._id}
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
                  <p className="text-xs capitalize tracking-wider ">
                    <b>Email:</b>
                    <span className="text-blue-400">{user.email}</span>
                  </p>
                </div>
                <div className="text-center bg-green-400 ms-3 rounded-full px-2 p-1 m-auto shadow-2xl ">
                  <button
                    onClick={() => addContact(user._id)}
                    className="tooltip"
                    data-tip="Add contact"
                  >
                    <GrUserAdd className="" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default React.memo(UserSearch);
