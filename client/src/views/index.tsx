import * as React from "react";
import { ProvideAuth, PrivateRoute } from  "../context/user"
import { Header } from "./template/Header"
import { UserIndex } from "./User";
import { RequireUser } from "./User/RequireUser";
import { Auth } from "../utils/auth-fetch"
import { UserList } from "./Users/list";
import { UserItem } from "./Users/item";
import { Home } from "./Home"
import { Page404 } from "./404";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

export function IndexView(){
  return (
    <ProvideAuth>
      <Router>
        <Header />
        <div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <UserIndex />
            </Route>
            <Route exact path="/users">
              <RequireUser>
                <UserList />
              </RequireUser>
            </Route>
            <Route
              path="/users/:id"
              children={
                <RequireUser>
                  <UserItem />
                </RequireUser>
              }
            />
            <Route path="*">
              <Page404 />
            </Route>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  )
}
