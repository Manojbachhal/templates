import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { ChatGroup, User } from "../interfaces/interfaces";
import { useAppSelector } from "../redux/hooks";
import gsap from 'gsap'
interface contacts {
  contacts: User[];
}

interface props {
  updateChats: (val: ChatGroup) => void;
  toggleNavDrawer: (val: string) => void;
}

function Contacts({ updateChats, toggleNavDrawer }: props) {
  const [contacts, setContacts] = useState<contacts[]>([]);

  const getContacts = async () => {
    try {
      const url = `http://localhost:3001/api/contacts`;
      let token = getCookie("Token");
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data.contacts);
      setContacts(res.data.contacts);
    } catch (error) {}
  };
  (() => {
    if (contacts.length === 0) getContacts();
  })();

  useEffect(()=>{
    let animation = gsap.from('.contact-div',{
      x:300,
      opacity:0.10,
      duration:1.5,
    })
    let animation1 = gsap.from ('.contact-details',{
      y:50,
      delay:1.5,
      opacity:0.10,
      duration:1.5,
    })

    // return ()=>{
    //   animation.kill();
    //   animation1.kill();
    // }
  })

  // start a chat

  const startChat = async (id: string) => {
    try {
      const url = `http://localhost:3001/api/`;
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

      if (res.status === 200) {
        updateChats(res.data);
        toggleNavDrawer("chat");
      }
    } catch (error) {}
  };

  // logged in user
  const currentUser = useAppSelector((store: any) => store.auth.user);
  return (
    <div className="p-2 mx-1 transparent-bg dark:bg-stone-900 h-full overflow-hidden">
      <div
        className="pt-2 flex transparent-bg align-items-center"
        style={{ height: "12%" }}
      >
        <h5 className="inline-flex px-3 text-3xl text-white items-center mb-4 font-semibold ">
          Contacts
        </h5>
      </div>
      {contacts?.map((currentContact, index) => {
        return currentContact.contacts.map((user) => {
          // console.log(user)

          return (
            user._id !== currentUser._id && (
              <div
                key={index}
                className="p-3 my-2 mx-3 mt-6 h-20 contact-bg glass contact-div"
                onClick={() => startChat(user._id)}
              >
                <div className="flex hover:cursor-pointer contact-details">
                  <div className="w-20">
                    <img src={user.pic} alt="" />
                  </div>
                  <div>
                    <p className="px-2 text-white text-2xl tracking-wider">
                      {user.name}
                    </p>
                  </div>
                </div>
              </div>
            )
          );
        });
      })}
    </div>
  );
}

export default Contacts;
