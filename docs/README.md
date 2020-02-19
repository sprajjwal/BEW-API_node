# Proposals approval

This API was intented to be used as a Final Project for BEW 1.3 at [Make School](https://www.makeschool.com). This API will be used later as a backend for making an interface to get projects approved by instructors.

## Installation

Start by installing the necessary node modules using:

```bash
npm install
```

Next, run the server using:

```bash
npm start
```

## Usage

This is a RESTful API that supports CRUDing over several resources. A standard response will be of type JSON like

```JSON
  response = {
                status: 200,
                message: "successfully completed method"
              }
```

### Methods for Students

#### Signup

Students can signup by making a POST request to:

`https://confessions-api.herokuapp.com/signup`

with a JSON containing username and password.

```JSON
  {
    username: USERNAME,
    password: PASSWORD
  }
```

with username and password as queries. This should either return a [JWT](http://www.jwt.io/) token or a status code of *404* and *error message*. The JWT token will also be set as a cookie.

#### Login

A GET method that returns a JSON and sets cookie with an authenticated JWT token. GET requests can be made to:

`https://confessions-api.herokuapp.com/login`

with a payload containing username and password if cookie isn't available.

The API will respond with a response that looks like the following:

```JSON
  response = {
                status: 200,
                message: "Success: Logged in",
                token: <JWT TOKEN>
              }
```

#### Logout

A GET method that clears out any cookies on your browser. Does not need to be called if cookies don't apply. GET requests can be made to:

`https://confessions-api.herokuapp.com/logout`