import React from "react";
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/accounts";
import Profile from "views/admin/profile";
import Abonnement from "views/admin/abonnement/abonnement";
import Facture from "views/admin/facture/facture";
import Test from "views/admin/contact/test"
import Prod from "views/admin/prod/prod"
import { MdHome, MdPerson, MdBarChart } from "react-icons/md";
import { MdOutlineSubscriptions,MdPayment } from 'react-icons/md';
import { MdContactMail } from "react-icons/md"; 

const superadminRoutes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Fournisseur",
    layout: "/admin",
    path: "nft-marketplace",
    icon: <MdPerson className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Products",
    layout: "/admin",
      path: "prod/prod",
    icon: <MdBarChart className="h-6 w-6" />,
 component: <Prod />,  },
  {
    name: "gestion d'abonnement",
    layout: "/admin",
    path: "abonnement",
    icon: <MdOutlineSubscriptions className="h-6 w-6 text-transparent" />,
    component: <Abonnement />,
},
{
  name: "Facture",
  layout: "/admin",
  path: "facture",
  icon: <MdPayment className="h-6 w-6 text-transparent" />,
  component: <Facture />,
},
{
  name: "Gestion de communication",
  layout: "/admin",
  path: "test",
  icon: <MdContactMail className="h-6 w-6 text-transparent" />,
  component: <Test />,
},


];

export default superadminRoutes;
