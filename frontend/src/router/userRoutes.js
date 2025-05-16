import React from "react";
import Profile from "views/admin/profile";
import AboutUs from "views/user/aboutUs/aboutUs";
import {
  MdPerson,
  MdOutlineMiscellaneousServices,
  MdOutlineProductionQuantityLimits,
  MdOutlinePeopleAlt,
  MdDriveFileRenameOutline,
  MdCleanHands,
  MdContacts,
} from "react-icons/md";
import ContentSection from "views/user/contentSection/contentSection";
import Settings from "views/user/settings/settings";
import Services from "views/user/services/index";
import Products from "views/user/products/index";
import ContactInformation from "views/user/contactInformation/contactInformation";
import Testt from "views/user/contact/testt"; 
import Rep from "views/user/contact/rep"; 



import { MdContactMail } from "react-icons/md"; 

const userRoutes = [
  // {
  //   name: "Main Dashboard",
  //   layout: "/admin",
  //   path: "default",
  //   icon: <MdHome className="h-6 w-6" />,
  //   component: <MainDashboard />,
  // },

  // {
  //   name: "Productss",
  //   layout: "/admin",
  //   path: "data-tables",
  //   icon: <MdBarChart className="h-6 w-6" />,
  //   component: <DataTables />,
  // },
  {
    name: "Mon Compte",
    layout: "/user",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Qui sommes-nous",
    layout: "/user",
    path: "aboutus",
    icon: <MdOutlinePeopleAlt className="h-6 w-6" />,
    component: <AboutUs />,
  },
  {
    name: "Contenu de Section",
    layout: "/user",
    path: "content-section",
    icon: <MdDriveFileRenameOutline className="h-6 w-6" />,
    component: <ContentSection />,
  },
  {
    name: "Paramètres",
    layout: "/user",
    path: "Settings",
    icon: <MdOutlineMiscellaneousServices className="h-6 w-6" />,
    component: <Settings />,
  },{
    name: "Informations de contact",
    layout: "/user",
    path: "ContactInformation",
    icon: <MdContacts className="h-6 w-6" />,
    component: <ContactInformation />,
  },
  {
    name: "Produits",
    layout: "/user",
    path: "products",
    icon: <MdOutlineProductionQuantityLimits className="h-6 w-6" />,
    component: <Products />,
  },
  {
    name: "Services",
    layout: "/user",
    path: "services",
    icon: <MdCleanHands className="h-6 w-6" />,
    component: <Services />,
  },
  
  
 
 
  {
    name: "Contact",
    layout: "/user",
    path: "contact/testt",
    icon: <MdContactMail className="h-6 w-6 text-transparent" />,
    component: <Testt/>,
  },

    {
      name: "rep",
      layout: "/user",
      path: "contact/rep/:id",
      component: <Rep/>,
    },

];

export default userRoutes;
