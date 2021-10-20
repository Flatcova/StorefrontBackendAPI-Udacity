[//]: # (Image References)

[image1]: ./images/fjord.jpg "Sample Input Image"
[image2]: ./new-images/fjord-100x100.jpg "Output Image resized to 100x100"

## Project Overview

Welcome to my Storefront Backend API project. In this project it's all the backend API from a store project, this API was created using Node.jS, Typescript, and Express.

The purpose of this project it's to create a the endpoints needed from a storefront project, which will give access to create delete and show products, as well creating orders from users. While everything it's connected to a PostgresSQL Database on Docker.

![Sample Input Image][image1]

This is an image example that processed trough the endpoint, the result was the next image, saved in the new-image folder and now every time the user wants the same image, it will be cache from there.

![Output Image resized to 100x100][image2]

The project has a logger that show all the process being made on the API, it will create a ``image-api.log`` where you can find the process that when throw as well in the terminal.

```
2021-09-21 14:34:26:3426 info: Successfull finding existing file in cache - undefined
2021-09-21 14:34:26:3426 info: File was found in cache - undefined
2021-09-21 14:34:38:3438 error: File not found in cache - Error: ENOENT: no such file or directory, access 'C:\Users\m_cov\Desktop\Udemy-Course\Image-Processing-Project\new-images\undefined-NaNxNaN.jpg'
2021-09-21 14:34:38:3438 warn: File not found, continue with creation - undefined
2021-09-21 14:34:38:3438 info: imageCreation starting - undefined
2021-09-21 14:34:38:3438 error: Error while creating new image - Error: Expected positive integer for width but received NaN of type number
```

## Project Instructions

### Instructions

1. Clone the repository and navigate to the downloaded folder.

```
git clone https://github.com/Flatcova/StorefrontBackendAPI-Udacity.git
cd StorefrontBackendAPI-Udacity
```

2. Intall all both devDependencies, and dependencies from package.json by just writing on your terminal
```
npm i
```

Also as an extra step you need to install ``db-migrate`` globaly on your machine in order to create migrations in futher actions. just run the next command:

```
npm i -g db-migrate
```

### Create Postgres DB with Docker

3. Once you already clone the repo and install the dependencies, it's time to create the Database that we'll use. For this you should already have Docker installed on your machine if not go to https://www.docker.com/get-started and do the instalation process.

On the project folder you should have a Docker-compose.yml file, run it on the terminal with this command: 

```
docker-compose up -d
```

This will create our two Databases, one for Testing and one for Development and creap them running in the backgound.

### Create DB with Migrations

4. Now that the Databases are create it's very simple by just running the script for crating the tables of our Databases

```
npm run migrate
```

this will run both our dev and test migrations for the project.

### Creating Environment values

5. Now that we have our database and all the dependencies installed, it's time just for one last adittion, and those are our Variables for connecting to those DB and also extra information to work with.

inside the Project folder create a ``.env`` file with this structure inside. just changin the values for the last 3 variables.
```
DATABASE=storefront-backend
TEST_DATABASE=storefront-backend-test
USERNAME=postgres
PASSWORD=postgres
HOST=localhost
DEV_PORT=5432
TEST_PORT=5433

ENV=dev

HASH_SECRET= YOUR-SECRET-HASH //Example(covalskyAPI)
SALT_ROUNDS= NUMBER-OF-ROUNDS //Example(10)
TOKEN_SECRET= YOUR-SECRET-FOR-TOKEN-VALIDATION //Example (udacityCourse)

```

6. It's time to run the project!!!!

Run the watch script so it with run with the TypeScript version before the compilation
```
npm run watch
```

If you like to see the compiled version the command to initialize the project already compiled inside the /dist folder is this:
```
npm run start
```

5. Open your browser on ``localhost:3000`` to see if your project it's running correctly also you can see the console response when the project it's up and running.

## HURRAYYY!!

Well, that was much work for just initiating the project, but now it's time to see how it works. for this following steps we are going to use Postman for testing all our endpoints.

To try all the endpoints it's recomended to use POSTMAN if you don't have postman visit the postman site ``https://www.postman.com/`` and download the Desktop App so you can test all the enpoints on the localhost:3000

### USER CRUD endpoints

7. When trying to resize the same image with the same parameters the image will be cache from the previous created.

## Aditional Scripts

1. Run eslint and prettier, you can use the next scripts to check for any error and clean the code.
```
npm run lint
```
following by
```
npm run prettier
```

2. Testing script will run the ``build`` script first and once created the ``/dist`` folder it would run jasmine for all the Unit test.
```
npm run test
```

3. For running the TypeScript version on src folder, I use ```Nodemon``` to be able to see changes on the server while develop.
```
npm run dev
```


<!-- REQUERIMENTS -->

# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
