import React from "react";
import InviteUser from "views/admin/accounts/ajoutadmin";
import EditAdmin from "views/admin/accounts/editadmin";
import AddProduct from "views/admin/tables/AddProduct";
import Ajoutabonnement from "views/admin/abonnement/ajoutabonnement";
import ModifierAbonnement from "views/admin/abonnement/modifierabonnement";
import Modifierfacture from "views/admin/facture/modiferfacture";
import Reply from "views/admin/contact/reply.jsx";
const Adminroutes = [
  {
    name: "Invite User",
    layout: "/admin",
    path: "accounts/ajoutadmin",
    component: <InviteUser />,
  },
  {
    name: "Edit Admin",
    layout: "/admin",
    path: "accounts/editadmin/:id",
    component: <EditAdmin />,
  },
  {
    name: "Add Product",
    layout: "/admin",
    path: "tables/addproduct",
    component: <AddProduct />,
  },
  {
    name: "Ajoutabonnement",
    layout: "/admin",
    path: "abonnement/Ajoutabonnement",
    component: <Ajoutabonnement />,
  },
  {
    name: "modifierabonnement",
    layout: "/admin",
    path: "abonnement/modifierabonnement/:id",
    component: <ModifierAbonnement />,
  },
  {
    name: "modifierfacture",
    layout: "/admin",
    path: "facture/modifierfacture/:id",
    component: <Modifierfacture/>,
  },

  {
    name: "reply",
    layout: "/admin",
    path: "test/reply/:id",
    component: <Reply/>,
  },
 
  

  
  
  // Add other routes here
];

export default Adminroutes;
