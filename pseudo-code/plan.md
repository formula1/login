
ClientSide
- auth util
  - register
  - login
  - logout
  - fetch (server with bearer token)
  - saveUser (localstorage)
  - isSaved (localStorage)
- ui
  - context provider
  - context consumer
- Routes
  - Register
    - asks server to create user
      - if a new user is created, provide a session token
  - Log In
    - asks server if the user exists
      - if the user exists, provide a new session token
  - Refresh Token
    - asks server if the token exists
      - is the token exists, remove the sent token and provide a new session token
- Ask if its ok to store the user
  - if yes, when register or login, saves the auth header in localstorage
  - this will allow the user to exit page and re enter as the user when re entering the page
- After X seconds, automatically refresh token
- Special Fetch Request
  - does a fetch request except it adds a token as the auth header


ServerSide
- Routes
  - Register
  - Log In
  - Refresh Token
- middleware which reads the auth header and gets a user from it
- middleware that requires a user
