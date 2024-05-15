import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { RxCross2 } from "react-icons/rx";
import { MdModeEditOutline } from "react-icons/md";
import EditUserDetails from "../Models/EditUserDetails";

interface Pros {
  userdrawerOpen: Boolean;
  toggleUserDrawer: () => void;
}
function UserDrawer() {
  const currentUser = useAppSelector((store: any) => store.auth.user);
  const [editUserDetailsOpen, seteditUserDetailsOpen] = useState(false);
  const togglevisiblity = () => {
    seteditUserDetailsOpen(!editUserDetailsOpen);
  };
  return (
    <>
      <div className="p-2 mx-1 transparent-bg h-full overflow-hidden custom-scrollbar overflow-y-scroll">
        <div className="transparent-bg " style={{ height: "12%" }}>
          <h5 className="px-3 py-4 text-3xl text-white mb-4 font-semibold ">
            Profile
          </h5>
        </div>
        <div className="pt-3">
          <img
            src={`http://localhost:3001/uploads/${currentUser.pic}`}
            style={{ width: "150px", height: "150px" }}
            className="m-auto rounded-full"
            alt=""
          />
          <div className=" p-2.5 mt-7">
            <p className="text-green-500  px-3 text-2xl">Your name</p>
            <div className="flex items-center justify-between px-3">
              <p className=" text-sky-400 dark:text-indigo-500 py-3 text-2xl">
                {currentUser.name}
              </p>
              <MdModeEditOutline
                className="dark:text-white hover:cursor-pointer"
                onClick={() => {
                  togglevisiblity();
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <EditUserDetails
        editUserDetailsOpen={editUserDetailsOpen}
        togglevisiblity={togglevisiblity}
      />
    </>
  );
}

export default React.memo(UserDrawer);
