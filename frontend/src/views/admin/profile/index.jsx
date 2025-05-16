import React, { useEffect, useState } from 'react';
import Banner from "./components/Banner";
import General from "./components/General";
import Upload from "./components/Upload";
import Project from "./components/Project";
import { useStores } from "stores/StoreProvider";
import axios from "axios";
import { observer } from 'mobx-react-lite';

const ProfileOverview = () => {
  const { profileStore } = useStores();
  // Retrieve user data from localStorage
  const fullname = localStorage.getItem('fullname') || "Default Name";
  const email = localStorage.getItem('email') || "default@example.com";
  const [user, setUser] = useState(null);

const getUser = async () =>{
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/superadmins/find-user`,
      { email }
    );
    console.log("Response:", response); // Log full response

      if (response.data.user) {
        profileStore.updateProfile(response.data.user);
        setUser(response.data.user)
        // Check if role is present in the user object
      } else {
        console.error("User data is missing");
      }
  } catch (err) {
    console.error("Error:", err);
  }
}

useEffect(() => {
  getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
  return (
    <div className="flex w-full flex-col gap-5">
      {/* Center the Banner */}
      <div className="mt-3 flex w-full justify-center">
        <div className="w-full max-w-4xl">
          <Banner fullname={fullname} image={profileStore?.user?.image} />
        </div>
      </div>

      {/* all project & ... */}
      <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-4">
          <Project />
        </div>
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
          <General
            user={user}
            loading={user ? false : true}
          />
        </div>
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-4">
          <Upload />
        </div>
      </div>
    </div>
  );
};

export default observer(ProfileOverview);
