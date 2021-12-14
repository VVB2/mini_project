# Getting Started with this project

## About this project

This is a **`MERN stack`** **E-Commerce** artifacts website purpose of the project is to builda platform for Artistss who
are great at their work and wish not to limit their talent and
also scale their talent. \
Also for the art lovers who do not wish to leave theirr town
but love to buy beautiful artifacts, **Artifacts Shop** will be a
platform for them to do so.

---

## Prerequisite

You need to have [**node**](https://nodejs.org/en/) as well as [**npm**](https://nodejs.org/en/) installed on your machine

---

## Client side project setup

### Steps to successfully run this project

-   Change your working directory using this command

    #### `cd client`

-   Then install all the depenedencies using

    #### `npm install`

-   The project is ready to be run in a development mode using

    #### `npm start`

    Runs the app in the development mode.\
     Open [http://localhost:3000/](http://localhost:3000/) to view it in the browser.

    The page will reload if you make edits.\
     You will also see any lint errors in the console.

-   You can test your application using the

    #### `npm test`

    Launches the test runner in the interactive watch mode.\
     See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

-   After making the required changes the production build of the project can be build using

    #### `npm run build`

    Builds the app for production to the `build` folder.\
     It correctly bundles React in production mode and optimizes the build for the best performance.

    The build is minified and the filenames include the hashes.\
     Your app is ready to be deployed!

    See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Environment Variables

-   Create a `.env` file in the root directory of the client folder

-   Create the environment variables **`REACT_APP_JWT_SECRET`** and **`REACT_APP_STRIPE_PUBLIC_KEY`**

    **`REACT_APP_JWT_SECRET`** - is an alphanumeric string used to make a secret key to authenticate the user and automatically log in the user

    **`REACT_APP_STRIPE_PUBLIC_KEY`** - can be found in the [**Stripe**](https://stripe.com/en-in) account

### Project folders

-   **`client/public`** - contains the static files like `index.html`, `favicon.ico`(page icon) and `sold_out.png` image

-   **`client/src`**
    -   **`src/assets`** - contains all the assets that is used for the creation of the website
    -   **`src/components`**
        -   **`components/Cards`** - contains the `.js` file to show the artifcats in a **Card** format
        -   **`components/Cart`** - contains the `.js` file to show the users **Cart**
        -   **`components/Checkout`** - contains the `.js` file to show the artiacts that are to be checked out
        -   **`components/DepartmentWise`** - contains the `.js` file to show the artifacts acording to their **Department**
        -   **`components/LandingPage`** - contains the `.js` file which the user will see when they first visit the website
        -   **`components/Loading`** - contains the `.js` file to
            show the **Loader** whenever the client tries to fetch data from the server
        -   **`components/LoginSignUp`** - contains the `.js` file to propt the user to **LogIn** or **SignUp** if not already done
        -   **`components/ProductPage`** - contains the `.js` file to show all the details of the product as well as the `Add to Cart` and `Buy Now` options.
        -   **`components/Profile`** - contains the `.js` file to show the **user profile** and the **order details**
    -   **`App.js`** - contains the entry `.js` file where all the other components reside
    -   **`index.js`** - the main `.js` file
    -   **`PrivateRoute.js`** - defines all the private routes that only the **Logged In** user can access

---

## Server side project setup

### Steps to successfully run this project

-   Change your working directory using this command

    #### `cd server`

-   Then install all the depenedencies using

    #### `npm install`

-   To start a development server use

    #### `npm run dev`

    Changes made to the **server** folder will be automatically reflected using this command

-   To start a production server use

    #### `npm start`

### Environment Variables

-   Create a `.env` file in the root directory of the server folder

-   Create the environment variables **`MONGODB_URI`**, **`JWT_SECRET`** and **`JWT_EXPIRE`**

    **`MONGODB_URI`** - contains the database URI used to connect server to the [**MongoDB**](https://www.mongodb.com/) database

    **`JWT_SECRET`** - is an alphanumeric string used to make a secret key to authenticate the user and automatically log in the user

    **`JWT_EXPIRE`** - creates a session for automatic user log in without reentering the user credentials.

### Project folders

-   **`server/config`** - contains the `.js` file to connect the server to the **MongoDB atlas**
-   **`server/controllers`** - the defination of what all the **API** endpoint will achieve
-   **`server/middleware`** - contains all the middleware forthe **API** endpoint
-   **`server/models`** - contains the database models
-   **`server/routes`** - all the **API** endpoints which the client can hit
-   **`server/utils`** - contains the utility `.js` files for ease of project building
