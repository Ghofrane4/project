import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import authRoutes from "router/Authroutes"; // Import authRoutes
import Footer from "components/footer/FooterAuthDefault";
import weeFarmLogo from "assets/logo/weefarm-logo.png";
import FixedPlugin from "components/fixedPlugin/FixedPlugin";
import Register from "views/auth/register"; // Adjust import path

export default function Auth() {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  document.documentElement.dir = "ltr";

  return (
    <div>
      <div className="relative h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
        <FixedPlugin />
        <div className="flex items-center justify-start mx-9">
      <img
          src={weeFarmLogo}
          width={"80px"}
          height={"80px"}
          alt="weeFarmLogo"
        />
        </div>
        <main className={`mx-auto min-h-screen`}>
          <div  className="relative flex">
            <div className="mx-auto flex min-h-full w-full flex-col justify-center items-center pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
              <div className="mb-auto flex flex-col pl-5 pr-5 md:pr-0 md:pl-12 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
                <Routes>
                  {getRoutes(authRoutes)} {/* Use authRoutes here */}
                  <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
                  <Route path="/auth/register/:token" element={<Register />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
