import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Footer from "components/footer/Footer";
import routes from "router/routes"; // Import routes from routes.js
import Adminroutes from "router/Adminroutes"; // Import Adminroutes
import InviteUser from "views/admin/accounts/ajoutadmin";
import EditAdmin from "views/admin/accounts/editadmin";

export default function Admin(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");

  React.useEffect(() => {
    const handleResize = () => {
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call it once to set the initial state

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    getActiveRoute([...routes, ...Adminroutes]); // Combine routes from both sources
  }, [location.pathname]);

  const getActiveRoute = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (window.location.href.includes(routes[i].layout + "/" + routes[i].path)) {
        setCurrentRoute(routes[i].name);
        return;
      }
    }
    setCurrentRoute("Main Dashboard");
  };

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      }
      return null;
    });
  };

  const getActiveNavbar = (routes) => {
    const activeRoute = routes.find(route => window.location.href.includes(route.layout + "/" + route.path));
    return activeRoute ? activeRoute.navbarItems : [];
  };

  document.documentElement.dir = "ltr";

  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        <main className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]">
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoText={"Horizon UI Tailwind React"}
              brandText={currentRoute}
              secondary={getActiveNavbar([...routes, ...Adminroutes])}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {getRoutes([...routes, ...Adminroutes])}
                <Route path="/" element={<Navigate to="/admin/default" replace />} />
                <Route path="/admin/accounts/ajoutadmin" element={<InviteUser />} />
                <Route path="/admin/accounts/editadmin/:id" element={<EditAdmin />} />
                </Routes>
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
