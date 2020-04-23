# Interview Scheduler

Interview Scheduler is single page application (SPA) which allows users to manage their appointments with interviewers. It has been built using React with the help of Storybook. This has allowed the incremental component-wise development of the App. Webpack-Dev-Server was used during development and tests were implemented using Jest for Unit & Integration and Cypress for E2E.

## Final Product

- !["Main"](https://github.com/riztaha/scheduler/blob/master/docs/Monday-example.png)
- !["Create"](https://github.com/riztaha/scheduler/blob/master/docs/Creating-Appt.png)
- !["Error"](https://github.com/riztaha/scheduler/blob/master/docs/Error-Handling.png)
- !["Delete"](https://github.com/riztaha/scheduler/blob/master/docs/Confirm-Delete.png)
- !["Server-Error"](https://github.com/riztaha/scheduler/blob/master/docs/Server-Error-Handling.png)

## Setup

1. Install dependencies with `npm install`.
2. The Scheduler app requires the use of a PostgreSQL DB setup and requires running the Scheduler-API server for the app to access the database.

## Setting up the database & Scheduler-API

Clone the repo & read the README!
https://github.com/lighthouse-labs/scheduler-api

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```


## Running Scheduler-api server
```sh
npm start
```

## Technical Specifications & App behaviour
React
Webpack, Babel
Axios, WebSockets
Axios
Storybook, Webpack Dev Server, Jest, Testing Library
The Scheduler client application created using Create React App. Express is the basis for the Scheduler API server application.

Both servers run concurrently; requests are proxied from the Webpack development server to the API server.

- Interviews can be booked between Monday and Friday.
- A user can switch between weekdays.
- A user can book an interview in an empty appointment slot.
- Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
- A user can cancel an existing interview.
- A user can edit the details of an existing interview.
- The list of days informs the user how many slots are available for each day.
- The expected day updates the number of spots available when an interview is booked or canceled.
- A user is presented with a confirmation when they attempt to cancel an interview.
- A user is shown an error if an interview cannot be saved or deleted.
- A user is shown a status indicator while asynchronous operations are in progress.
- When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
- The application makes API requests to load and persist data. We do not lose data after a browser refresh.

## List of Project Dependencies
    **babel/core**
    **node-sass**
    prop-types 
    react-test-renderer 
    **axios**
    classnames 
    normalize.css 
    **react**
    react-dom 
    react-scripts
    **storybook**
    storybook/addon-actions 
    storybook/addon-backgrounds 
    storybook/addon-links 
    storybook/addons 
    storybook/react 
    **testing-library/jest-dom**
    testing-library/react 
    testing-library/react-hooks 