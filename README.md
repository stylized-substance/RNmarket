# RNmarket

This is an E-commerce single-page app built with Typescript, React, Node.js and PostgreSQL.

Project work log can be found in `timekeeping.md`

## Components

- Frontend
  - React
  - React-Bootstrap for styling
  - Axios for API requests
  - Formik for forms
  - TanStack Query for handling server state

- Backend
  - Node.js
  - Express webserver
  - Sequelize ORM for database connections
  - Umzug for database migrations
  - Jest & supertest for testing

- Database
  - PostgreSQL


## Usage

The app works like a typical webshop. Products can be viewed, filtered and added to cart. Orders can be placed for cart items and the orders get saved into the database. Logged in users can also write reviews when viewing a single product. Logged in admin users gain access to an admin page through the site's navigation bar (link appears after logging in).

There are two pre-made users for testing:

- Regular user
  - Username: test_user@example.org
  - Password: **password**

- Admin user
  - Username: admin@example.org
  - Password: **password**

## Development mode

### Environment variables

The backend relies on multiple environment variables. These can be edited in `/backend/docker-compose.dev.yml`. In case variables aren't set in the Docker Compose file, the app tries to read them from a `.env` file in `/backend` directory.

Default variables with explanations:

**PORT=3003** - Express web server listening port. The same port must be set in `nginx.dev.conf`
**DATABASE_URL=postgres://postgres:dbpassword@rnmarket-backend-postgres:5432/postgres** - PostgreSQL database address with development credentials  
**JWTACCESSTOKENSECRET=accesssecret** - Signing secret for JSON Web Tokens (access token)  
**JWTREFRESHTOKENSECRET=refreshsecret** - Signing secret for JSON Web Tokens (refresh token)  
**JWTACCESSTOKENEXPIRATION=3600** - JSON Web Token expiration time in seconds (access token)  
**JWTREFRESHTOKENEXPIRATION=86400** - JSON Web Token expiration time in seconds (refresh token)

### Starting the app locally

The app uses Vite, ts-node, Docker containers, Docker Compose and a nginx reverse proxy for the development environment. The source file directories of the backend and frontend are bind mounted to their respective containers so changes to code are hot loaded while the containers are running.

**To start:**

Clone this repository.
>
> *Install dependencies outside containers to get rid of IntelliSense errors in code editor*
>
> `cd backend && npm install`
>
> `cd frontend && npm install`

Change directory to repository root and run `docker compose -f docker-compose.dev.yml up` to start the development environment. The app is then accessible at http://localhost:8080


### App networking structure in development mode

The app must be accessed through the reverse-proxy at http://localhost:8080. The frontend can't find the backend if frontend is accessed directly.

> client -> reverse-proxy (http://localhost:8080) -> frontend -> backend

## Miscellaneous info

- The backend runs database migrations on start to populate the database with products, reviews and users.
- User passwords are hashed with bcrypt before saving to database.
- The app uses JSON Web Tokens for user session management. When logging in, the server creates access and refresh tokens and sends them to the client.  
When an access token expires, it is refreshed behind the scenes. When the refresh token expires, the user is prompted to log in again.  
Default expiration times are 1 hour for access tokens and 24 hours for refresh tokens.