import React, { Suspense, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { loadSiteSettings } from "./Services/Actions/siteSettingAction";

import { AdminRoutes } from "./BackendScreen/Sections/sidebarData";
import UserRoutes from "./FrontendScreen/Sections/Routes/UserRoutes";
import ProtectedRoute from "./helpers/ProtectedRoute";
import Loader from "./components/Loader/Loader";
const Header = React.lazy(() =>
  import("./FrontendScreen/Sections/Common/Header")
);
const Footer = React.lazy(() =>
  import("./FrontendScreen/Sections/Common/Footer")
);
const AdminLogin = React.lazy(() => import("./BackendScreen/Auth/AdminLogin"));
const Dashboard = React.lazy(() =>
  import("./BackendScreen/Sections/Dashboard")
);
const NotFound = React.lazy(() =>
  import("./FrontendScreen/Pages/404/NotFound")
);

const Connection = () => {
  let user = localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH);
  const navigate = useNavigate();

  // load site Settings
  const { siteSettings } = useSelector((state) => state.siteSettingData);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      try {
        if (user) {
          localStorage.removeItem(import.meta.env.VITE_ADMIN_AUTH);
          window.location.reload(false);
          navigate("/admin");
          console.log("login expire");
        }
      } catch (error) {
        localStorage.removeItem(import.meta.env.VITE_ADMIN_AUTH);
        console.log("error signing in", error);
      }
    }, 86400000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    dispatch(loadSiteSettings());
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Suspense fallback={<Loader loading={true} />}>
        <HelmetProvider>
          <Helmet>
            <title>{siteSettings?.rows?.site_title || ""}</title>
            <meta
              name="keywords"
              content={siteSettings?.rows?.meta_title || ""}
            />
            <meta
              name="description"
              content={siteSettings?.rows?.meta_description || ""}
            />
            <link
              rel="icon"
              type="image/png"
              href={
                `${import.meta.env.VITE_IP_URL}/${
                  siteSettings?.rows?.favicon
                }` || ""
              }
              sizes="16x16"
            />
          </Helmet>
        </HelmetProvider>
        <Routes>
          {/* Frontend Route */}
          <Route path="/" element={<Header />}>
            <Route path="/" element={<Footer />}>
              {UserRoutes.map((sidebar) => {
                return sidebar?.child ? (
                  <Route
                    exact
                    path={`/${sidebar.path}`}
                    element={sidebar.element}
                    key={sidebar.path}
                  >
                    {sidebar.child.map((side) => {
                      return side?.protected ? (
                        <Route element={<ProtectedRoute />} key={side.path}>
                          <Route
                            exact
                            path={`/${side.path}`}
                            element={side.element}
                          />
                        </Route>
                      ) : (
                        <Route
                          exact
                          path={`/${side.path}`}
                          element={side.element}
                          key={side.path}
                        />
                      );
                    })}
                  </Route>
                ) : sidebar?.protected ? (
                  <Route element={<ProtectedRoute />} key={sidebar.path}>
                    <Route
                      path={`/${sidebar.path}`}
                      element={sidebar.element}
                      exact
                    />
                  </Route>
                ) : (
                  <Route
                    key={sidebar.path}
                    path={`/${sidebar.path}`}
                    element={sidebar.element}
                    exact
                  />
                );
              })}
            </Route>
          </Route>
          {/* End Frontend Route */}

          {/* Backend Route */}
          <Route exact path="/admin" element={<AdminLogin />} />
          <Route exact path="/dashboard" element={<Dashboard />}>
            {AdminRoutes.filter((find) => find.enabled).map((sidebar) => {
              return (
                <Route
                  exact
                  path={`/dashboard/${sidebar.path}`}
                  element={sidebar.element}
                  key={sidebar.path}
                />
              );
            })}
          </Route>
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
          {/* 404 */}
        </Routes>
        {/* End Backend Route */}
      </Suspense>
    </>
  );
};

export default Connection;
