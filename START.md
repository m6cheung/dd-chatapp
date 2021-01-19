## Getting started

This application was built using ReactJS

### 1. Installing minimum deps

Make sure you have `node` installed, with a version greater than `7.0.0`. We highly recommend [`nvm`](https://github.com/creationix/nvm), or just installing the latest version of `node` with `brew install node` on macOS.

Once you have a good `node` installed, run `npm install` in this repo to get your dependencies.

### 2. Building the app

If you want to build the application with the JS bundle uglified and minifed, run `npm run build`, otherwise run `npm run build:dev`.

### 3. Running the api server

Run `npm run api-server` to start the backend server.

### 4. Starting the app

Serve the app using `npm run start`. The app will be served at `http://localhost:3000`

If you want to start it using `webpack-dev-server`, run `npm run start:dev` or `npm run start:prod`. If you start it this way, the app will be served at `http://localhost:8081`

## 5. Navigating the app

The landing page will be the Login page. When you log in, you will be defaulted to the first chat room. From there you can choose the chat rooms available and start sending messages. Polling has been implemented to support chatting between browsers-tabs.

## Easy Instructions:

1. `npm install`
2. `npm run build`
3. `npm run api-server`
4. In a new terminal window/tab --> `npm run start`
5. Navigate to `http://localhost:3000`.
