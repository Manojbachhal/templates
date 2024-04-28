import axios from 'axios';
import { getCookie } from 'cookies-next';
import React, { useState } from 'react'
import { ChatGroup, User } from '../interfaces/interfaces';
import { useAppSelector } from '../redux/hooks';


interface contacts {
  contacts: User[]
}

interface props {
  updateChats: (val: ChatGroup) => void;
}


function Contacts({ updateChats }: props) {
  const [contacts, setContacts] = useState<contacts[]>([]);

  const getContacts = async () => {
    try {
      const url = `http://localhost:3001/api/contacts`;
      let token = getCookie("Token");
      const res = await axios.get(
        url,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //  console.log(res.data.contacts)
      setContacts(res.data.contacts)

    } catch (error) { }

  }
  (() => {
    if (contacts.length === 0) getContacts();
  })();

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
      }


    } catch (error) { }
  };

  // logged in user
  const currentUser = useAppSelector((store: any) => store.auth.user);
  return (
    <div>
      {
        contacts?.map((currentContact, index) => {
          return currentContact.contacts.map((user) => {
            // console.log(user)

            return (
              user._id !== currentUser._id && (
                <div
                  key={index}
                  className="p-3 my-2 mx-3 mt-6 h-20 contact-bg glass"
                  onClick={() => startChat(user._id)}
                >
                  <div className="flex hover:cursor-pointer">
                    <div className="w-20">

                      <img
                        src={user.pic}
                        alt=""
                      />
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
          })
        })
      }
    </div>
  )
}

export default Contacts