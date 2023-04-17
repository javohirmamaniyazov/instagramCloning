import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import * as ROUTES from "../Constants/Routes"

const WithRedirectAuthUser = ({ user, children }) => {
  return !user ? children : <Navigate to={ROUTES.DASHBOARD} />
}

const RequireAuth = ({ user, children }) => {
  const location = useLocation()

  return user ? children : <Navigate to={ROUTES.LOGIN} state={{ from: location }} />
}

export { WithRedirectAuthUser, RequireAuth }
