import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Dropdown from "components/dropdown";
import { FiAlignJustify } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import avatar from "assets/img/avatars/avatar4.png";
import axios from "axios";
import { useStores } from "stores/StoreProvider";
import { observer } from "mobx-react-lite";

const Navbar = (props) => {
  const { profileStore } = useStores();
  const { onOpenSidenav, brandText } = props;
  const [fullname, setFullname] = useState("");
  const [role, setRole] = useState("");
  const [nbreNotif, setNbreNotif] = useState(0);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/superadmins/find-user`,
        { email: localStorage.getItem("email") }
      );
      if (response.data.user) {
        // Optionnel : setUser(response.data.user);
      } else {
        console.error("User data is missing");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const fetchNotificationCount = async () => {
    try {
      const userId = localStorage.getItem("id");
      const fullname = localStorage.getItem("fullname");

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/notifications/${userId}/${encodeURIComponent(fullname)}`
      );

      if (response.data) {
        setNbreNotif(response.data.notificationCount);
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des notifications :", err);
    }
  };

  const handleNotificationClick = async () => {
    const userId = localStorage.getItem("id");
    const fullname = localStorage.getItem("fullname");
    const role = localStorage.getItem("role");

    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/notifications/unsetNotif/${userId}/${encodeURIComponent(fullname)}`
      );
      if (role !== "user") {
        navigate("/admin/test");
      } else {
        navigate("/user/contact/testt");
      }
    } catch (err) {
      console.error("Erreur lors de la suppression des notifications :", err);
    }
  };

  const handleMultipleClicks = () => {
    handleNotificationClick();
  };

  useEffect(() => {
    const storedFullname = localStorage.getItem("fullname");
    const storedRole = localStorage.getItem("role");

    if (storedFullname) setFullname(storedFullname);
    if (storedRole) setRole(storedRole);

    getUser();
    fetchNotificationCount();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth/sign-in");
    window.location.reload();
  };

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <a className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white" href="#">
            Pages
            <span className="mx-1 text-sm text-navy-700 dark:text-white"> / </span>
          </a>
          <Link className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white" to="#">
            {brandText}
          </Link>
        </div>
      </div>

      <div className="relative mt-[3px] flex h-[61px] w-[240px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[240px] xl:gap-2">
        <span className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden" onClick={onOpenSidenav}>
          <FiAlignJustify className="h-5 w-5" />
        </span>

        {/* Notification + Nom + Rôle */}
        <div className="flex flex-col max-w-[120px] whitespace-nowrap overflow-hidden text-ellipsis">
          <span className="text-sm font-medium text-navy-700 dark:text-white">
            {fullname}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-300">
            {role === "user" ? "User" : "Admin"}
          </span>
        </div>

        <div className="flex items-center gap-2 cursor-pointer" onClick={handleMultipleClicks}>
          <IoMdNotificationsOutline className="h-6 w-6 text-gray-600 dark:text-white" />
          {nbreNotif > 0 && (
            <span className="relative -ml-2 -mt-3 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              {nbreNotif}
            </span>
          )}
        </div>

        {/* Avatar & Menu */}
        <Dropdown
          button={
            <img
              className="h-10 w-10 rounded-full"
              src={
                profileStore?.user?.image
                  ? `${process.env.REACT_APP_BACKEND_URL}${profileStore?.user?.image}`
                  : avatar
              }
              alt="User Avatar"
            />
          }
          children={
            <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div className="flex flex-col p-4">
                <Link to="/user/profile" className="text-sm text-gray-800 dark:text-white hover:dark:text-white">
                  Paramètres du profil
                </Link>
                <button
                  onClick={handleLogout}
                  className="mt-3 text-sm font-medium text-red-500 transition duration-150 ease-out hover:text-red-500 hover:ease-in"
                >
                  Log Out
                </button>
              </div>
            </div>
          }
          classNames={"py-2 top-8 -left-[180px] w-max"}
        />
      </div>
    </nav>
  );
};

export default observer(Navbar);
