import React from "react"
import { Switch } from "react-router-dom"

import LandingPage from "./LandingPage/"
import Dashboard from "./pages/Dashboard"
import CustomRoute from "../utils/CustomRoute"
import Pages from "./pages/Pages"

const Root = () => (
  <Switch>
    <CustomRoute path="/" exact component={LandingPage} />
    <CustomRoute path="/app" protectedPath component={Dashboard} />
    <CustomRoute path="/" component={Pages} />
    <CustomRoute render={() => <div>404: Route not found</div>} />
    <Pages />
  </Switch>
)
export default Root
