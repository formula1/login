import * as React from "react";
import { UserForm } from "./UserForm";
import { Auth } from "../../utils/auth-fetch"
import {
  useAuth
} from "../../context/user";
import {
  useHistory,
  Redirect
} from "react-router-dom";


function UserIndex({ children }: { children?: React.ReactNode; }){
  const auth = useAuth();
  let history = useHistory();

  const [running, setRunning] = React.useState(false)
  const [userError, setUserError] = React.useState(void 0);

  if(auth.user){
    return (
      <Redirect
        to={{ pathname: "/", }}
      />
    )

  }

  if(running){
    return (
      <div>Please Wait</div>
    )
  }

  return (
    <div>
      { userError && <h1>{userError}</h1>}
      <UserForm
        onSubmit={(
          {
          register,
          username,
          email,
          password
        }: {
          register: true,
          username: string,
          email: string,
          password: string
        } | {
          register: false,
          username: void,
          email: string,
          password: string
        })=>{
          setRunning(true)
          setUserError(void 0)
          if(register){
            if(username){
              auth.register({
                username, email, password
              }).then(()=>{
                setRunning(false);
              }).catch((e: Error)=>{
                setRunning(false)
                setUserError(e.message)
              })
            }
          } else {
            auth.login({
              email, password
            }).then(()=>{
              setRunning(false);
            }).catch((e: Error)=>{
              setRunning(false)
              setUserError(e.message)
            })
          }

        }}
      />
    </div>
  );
}

export { UserIndex };
