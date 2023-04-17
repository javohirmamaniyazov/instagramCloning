import { FirebaseAuthContext } from "./Context/AuthContext";
import { RequireAuth, WithRedirectAuthUser } from "./Helper/Routes";
import React, { lazy, Suspense, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as ROUTES from './Constants/Routes';
import { NotFound } from "./pages/NotFound";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/SignUp"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));

const App = () => {
  const user = useContext(FirebaseAuthContext);

  return (
    <Router>
      <Suspense
        fallback={
          <div className="loading">
            <img src="/images/icons/instagram-icon.png" alt="loading icon" />
          </div>
        }
      >
        <Routes>
          <Route
            path={ROUTES.LOGIN}
            element={
              <WithRedirectAuthUser user={user}>
                <Login />
              </WithRedirectAuthUser>
            }
          />
          <Route
            path={ROUTES.SIGN_UP}
            element={
              <WithRedirectAuthUser user={user}>
                <Signup />
              </WithRedirectAuthUser>
            }
          />
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <RequireAuth user={user}>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path={ROUTES.PROFILE}
            element={
              <RequireAuth user={user}>
                <Profile />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
