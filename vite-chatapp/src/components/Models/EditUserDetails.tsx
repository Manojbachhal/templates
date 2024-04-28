import React, { useRef } from "react";

//icons
import { RxCross2 } from "react-icons/rx";

import userPic from "../../data/user.png";
import { editDetails } from "../../redux/users/getUsersAction";
interface props {
  editUserDetailsOpen: boolean;
  togglevisiblity: () => void;
}

function EditUserDetails({ editUserDetailsOpen, togglevisiblity }: props) {
  const nameref = useRef<HTMLInputElement>(null);
  const imageref = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("first");

    const name = nameref.current?.value;
    const imageFile = imageref.current?.files
      ? imageref.current?.files[0]
      : null;

    const formData = new FormData();

    if (imageFile) {
      formData.append("file", imageFile);
    }

    if (name) {
      formData.append("name", name);
    }

    try {
      await editDetails("http://localhost:3001/users/edit-details", formData);
    } catch (error) {
      // Handle errors
      console.error("Error editing details:", error);
    }
  };
  return (
    <div
      className={
        editUserDetailsOpen
          ? "fixed side-drawer overflow-y-scroll custom-scrollbar left-1/4 top-14 bottom-14 z-40 shadow-lg w-1/2 bg-red-500 dark:bg-black"
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
            {/* <HiOutlineUserGroup className="me-3" /> */}
            <img src={userPic} alt="" width={"25px"} className="me-3" />
            Edit User Details
          </h5>
          <button
            type="button"
            onClick={togglevisiblity} // Close the drawer on button click
            className="dark:bg-black bg-slate-800  hover:bg-white dark:hover:bg-white  text-sm w-8 h-8 absolute end-4 flex items-center justify-center "
          >
            <RxCross2 className="text-lg text-gray-300 dark:text-white hover:text-black dark:hover:text-black " />
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        {/* form content */}
        <div className="p-4 relative side-drawer">
          <form
            id="groupForm"
            className="max-w-lg mx-auto border-2 border-b-0 border-r-0 border-l-0 rounded bg-white"
            onSubmit={handleSubmit}
          >
            <div className="w-full">
              <div className="mx-2">
                <label
                  htmlFor="groupname"
                  className="block p-2 text-xl text-blue-600 font-bold mb-2"
                >
                  User Name
                </label>
                <input
                  type="text"
                  id="groupname"
                  name="group name"
                  className="pl-4 block p-2.5 pr-9 w-full z-20 text-sm bg-slate-200 text-gray-900 rounded border-2 focus:outline-none"
                  placeholder="Enter user Name"
                  required
                  ref={nameref}
                />
              </div>
              <div className="mx-2 my-4">
                <label
                  htmlFor="groupname"
                  className="block p-2 text-xl text-blue-600 font-bold mb-2"
                >
                  Profile Pic
                </label>
                <input
                  type="file"
                  name="file"
                  id=""
                  ref={imageref}
                  className="text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                />
              </div>

              <div className="flex justify-end p-3">
                <button type="submit" className="bg-blue-600 text-white p-2.5 ">
                  Update Details
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default React.memo(EditUserDetails);
