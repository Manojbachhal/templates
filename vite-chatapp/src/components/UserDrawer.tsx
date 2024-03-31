import React from "react";
import { useAppSelector } from "../redux/hooks";
import { RxCross2 } from "react-icons/rx";
import { MdModeEditOutline } from "react-icons/md";

interface Pros {
  userdrawerOpen: Boolean;
  toggleUserDrawer: () => void;
}
function UserDrawer() {
  const currentUser = useAppSelector((store: any) => store.auth.user);

  return (
    <div className="m-2 mt-5 transparent-bg h-90-percent">
      <div className="transparent-bg ps-2 h-20 ">
        <h5 className="px-3 py-4 text-3xl text-white mb-4 font-semibold ">
          Profile
        </h5>
      </div>
      <div className="pt-3">
        <img
          src={currentUser.pic}
          width={"70%"}
          className="m-auto rounded-full"
          alt=""
        />
        <div className=" p-2.5 mt-7">
          <p className="text-green-500  px-3 text-2xl">Your name</p>
          <div className="flex items-center justify-between px-3">
            <p className=" dark:text-indigo-500 py-3 text-2xl">
              {currentUser.name}
            </p>
            <MdModeEditOutline className="dark:text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(UserDrawer);
