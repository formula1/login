
import {
  fetchServer
} from "./server-fetch"

class Auth {
  saveToken: boolean = true;
  user: string;
  expirationDate: number = 0;
  token: string;
  refreshTimeout: NodeJS.Timeout;
  loginRoute: string;

  constructor(loginRoute: string){
    this.loginRoute = loginRoute
    var saveToken = localStorage.getItem("saveToken");
    if(saveToken == null){
      (this.saveToken as any) = false;
    }else{
      this.saveToken = true;
      const json = JSON.parse(saveToken);
      if(Date.now() > json.expirationDate){
        this.user = void 0;
        this.expirationDate = 0;
        this.token = void 0;
        throw new Error("can't refresh token, must login again")
      } else {
        this.handleResponseJSON(json)
      }
    }
  }

  setSaveToken(boo: boolean){
    this.saveToken = boo;
    if(boo){
      localStorage.setItem("saveToken", JSON.stringify({
        token: this.token,
        expirationDate: this.expirationDate,
        user: this.user
      }))
    } else {
      localStorage.removeItem("saveToken");
    }
  }

  handleResponseJSON(json: any){
    this.token = json.token;
    this.expirationDate = json.expirationDate;
    this.user = json.user;

    console.log("save token:", this.saveToken, json)
    if(this.saveToken) this.setSaveToken(true);

    // get difference of now and expirationDate, then subtract by 5 minutes
    var offset = this.expirationDate - Date.now() - 1000 * 60 * 5;
    // var offset = 1000 * 5;
    console.log("Refreshing token in " + offset + " milliseconds")
    console.log("Refreshing token in " + offset / (1000 * 60 * 60 ) + " hours")
    clearTimeout(this.refreshTimeout)
    this.refreshTimeout = setTimeout(()=>{
      this.refreshToken();
    }, offset)
  }

  logout(){
    clearTimeout(this.refreshTimeout)
    this.setSaveToken(false);
  }

  register(
    {
      username, email, password
    } : {
      username: string, email: string, password: string
    }
  ){

    console.log("REGISTER");
    return fetchServer(
      "/auth/register",
      {
        method: "POST",
        body: JSON.stringify({
          username, email, password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then((response)=>{
      return response.json().then((json)=>{
        if(!response.ok){
          console.error(json);
          throw json
        }
        console.log(json);
        this.handleResponseJSON(json)
      })
    })
  }
  login(
    {
      email, password
    } : {
      email: string, password: string
    }
  ){
    return fetchServer(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify({
          email, password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }

    ).then((response)=>{
      return response.json().then((json)=>{
        if(!response.ok){
          console.error(json);
          throw json
        }
        console.log(json);
        this.handleResponseJSON(json)
      })

    })
  }

  refreshToken(){
    this.fetch("/auth/refresh").then((response)=>{
      return response.json().then((json)=>{
        if(!response.ok){
          console.error(json);
          throw json
        }
        console.log(json);
        this.handleResponseJSON(json)
      })
    })
  }

  fetch(url: string, props?: RequestInit){
    if(!props){
      props = {};
    }
    if(typeof props.headers !== "object"){
      props.headers = {};
    } else if(props.headers instanceof Headers){
      var oldHeaders = props.headers as Headers;
      var newHeaders = {} as any;
      for (var pair of (oldHeaders as any).entries()) {
        console.log(pair[0]+ ': '+ pair[1]);
        newHeaders[pair[0]] = pair[1];
      }
      props.headers = newHeaders;
    }

    if(!(props.headers as any)["Authorization"]){
      var bearer = 'Bearer ' + this.token;
      (props.headers as any)["Authorization"] = bearer;
    }

    return fetchServer(url, props)
  }

}

export { Auth }
