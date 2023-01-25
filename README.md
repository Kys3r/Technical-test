# API for Express.js

## Requirements

-   Node.js (latest version)
-   MongoDB Community Edition

## Installation

1. Clone the repository
2. Run `npm i` to install the dependencies
3. Run `npm run build` to build the project
4. Run `npm run start` to start the server
5. Run `npm run test` to run the tests (server need to running)

## Usage

The API documentation can be found at the following url: `http://localhost:3000/api-docs`
Except for routes /auth, a token must be passed in the request's Headers:
Headers -> authorization
Format:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NzE3MzU4OTQsImV4cCI6MTY3MTgyMTg5NH0.KnT34slN54B4z3FXB7M26t3iIoMdNcyRFgJhMLePwzY
