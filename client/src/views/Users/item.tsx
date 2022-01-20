import * as React from "react";
import {
  useParams
} from "react-router-dom";

import {
  useAuth
} from "../../context/user";

export function UserItem(){
  let { id } = useParams() as { id: string };
  const auth = useAuth();

  const [user, setUser] = React.useState();

  React.useEffect(() => {
    console.log("retrieving users");
    auth.fetch("/admin/users/" + id).then((response)=>{
      return response.json().then((json)=>{
        if(!response.ok) throw json;
        setUser(json);
      })
    }).catch((err)=>{
      console.error("get users err:", err)
    })
  }, [])

  if(!user){
    return null;
  }

  return (
    <ul>
      <li><span>_id: </span><span>{(user as any)._id}</span></li>
      <li><span>name: </span><span>{(user as any).name}</span></li>
      <li><span>created: </span><span>{(user as any).created}</span></li>
    </ul>
  );
}
