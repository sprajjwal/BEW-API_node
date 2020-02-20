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

#### Getting all proposals

A GET method that returns a JSON with all proposals made by a student. GET requests can be made to:

`https://confessions-api.herokuapp.com/proposals`

The API will respond with a JSON that looks like the following:

```JSON
  [
    {
      "id": 0,
      "title": "me title 1",
      "summary": "big boy proposal 1"
    },
    ...
  ]
```

#### Sending new proposals

A POST method that takens a JSON and adds a new proposal for *Student* users. POST requests can be made to:

`https://confessions-api.herokuapp.com/proposals/new`

The API will respond with:

```JSON
  response = {
                status: 200,
                message: "Success: Proposal added"
              }
```

#### Viewing a particular proposal

A GET method that returns a JSON with a particular proposal with given id. GET requests can be made to:

`https://confessions-api.herokuapp.com/proposal/<id>`

The API will respond with a JSON that looks like the following:

```JSON
  {
    "title": "me title 1",
    "summary": "big boy proposal 1"
  }
```

#### Update a particular proposal

A POST method that returns a JSON with a confirmation after updating a proposal at the given id. POST requests can be made to:

`https://confessions-api.herokuapp.com/proposal/<id>/update`

The body needs have the following format or the update will be rejected.

```JSON
  {
    title: "NEW TITLE",
    summary: "SUMMARY",
    token: token
  }
```

The API will respond with:

```JSON
  response = {
                status: 200,
                message: "Success: Proposal updated"
              }
```

#### Delete a particular proposal

A POST method that returns a JSON with a confirmation after deleting a proposal at the given id. POST requests can be made to:

`https://confessions-api.herokuapp.com/proposal/<id>/delete`

The API will respond with:

```JSON
  response = {
                status: 200,
                message: "Success: Proposal deleted"
              }
```
