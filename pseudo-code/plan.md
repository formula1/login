
ClientSide
- auth util
  - register
    - asks server to create user
      - if a new user is created, provide a session token
  - login
    - asks server if the user exists
      - if the user exists, provide a new session token
  - logout
  - fetch (request server with saves bearer token)
  - isSaved: boolean
  - saveUser (localstorage)
    - if user is not logged in, save nothing
    - if  isSaved is false, save nothing
    - save user to localstorage
- ui
  - context provider
  - context consumer
  - redirect if no user
- automatic refresh token
  - asks server if the token exists
    - is the token exists, remove the sent token and provide a new session token

ServerSide
- Routes
  - Register
  - Log In
  - Refresh Token
- middleware
  - reads the auth header and gets a user from it
  - middleware that requires a user
