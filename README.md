[//]: # (Image References)

[image1]: ./images/fjord.jpg "Sample Input Image"
[image2]: ./new-images/fjord-100x100.jpg "Output Image resized to 100x100"

## Project Overview

Welcome to my Storefront Backend API project. In this project it's all the backend API from a store project, this API was created using Node.jS, Typescript, and Express.

The purpose of this project it's to create a the endpoints needed from a storefront project, which will give access to create delete and show products, as well creating orders from users. While everything it's connected to a PostgresSQL Database on Docker.

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

Open your browser on ``localhost:3000`` to see if your project it's running correctly also you can see the console response when the project it's up and running.

## HURRAYYY!!

Well, that was much work for just initiating the project, but now it's time to see how it works. for this following steps we are going to use Postman for testing all our endpoints.

To try all the endpoints it's recomended to use POSTMAN if you don't have postman visit the postman site https://www.postman.com/ and download the Desktop App so you can test all the enpoints on the localhost:3000

## API Endpoints

### Authorization endpoints

As a requirement from the stakeholders, to be able to create a User, you must have a token that authorize for this process, for the first ever user, you can remove the middleware from the route insise ``\src\handlers\users_handler.ts`` at the bottom of the file on the ``users_routes`` function. and put it back once the unitial user is created and you saved the Token displayed, for future calls to routes with Authorization needed.

#### Products
- `products` [GET] - Index 
- `products/:id` [GET] - Show
- `products` [POST] - Create [token required]
- `top-products` [GET] - [OPTIONAL] Top 5 most popular products 
- `products/:category` [GET] - [OPTIONAL] Products by category (args: product category)

#### Users
- `users` [GET] - Index [token required]
- `users/:id` [GET] - Show [token required]
- `users` [POST] - Create N[token required]

#### Orders
- `order/:user_id` [GET] - Current Order by user (args: user id)[token required]
- `orders/:user_id` [GET] - [OPTIONAL] Completed Orders by user (args: user id)[token required]

Additional
- `orders` [GET] - All Orders
- `orders` [POST] - Create a new Order by user (args: user id)[token required]
- `order/:id/products` [POST] - Crate a Order Product (args: order id)[token required]
- `order/:id` [PUT] - Update Order to complete (args: order id)[token required]
- `order/:id` [DELETE] - Delete a Order with it's Order Products (args: order id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

```
TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    price money NOT NULL,
    category VARCHAR(150),
    selled integer DEFAULT 0
);
```

#### User
- id
- firstName
- lastName
- password

```
TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(150),
    lastName VARCHAR(150),
    password VARCHAR(150)
);
```

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

```
TABLE orders (
    id SERIAL PRIMARY KEY, 
    user_id bigint REFERENCES users(id),
    order_status VARCHAR(100) DEFAULT 'active'
);

TABLE order_product (
    id SERIAL PRIMARY KEY,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id),
    quantity integer
);
```

## Aditional Scripts

1. Run eslint and prettier, you can use the next scripts to check for any error and clean the code.
```
npm run lint
```
following by
```
npm run prettier
```

2. Testing script will run the ``build`` script first and once created the ``/dist`` folder it would run jasmine for all the Unit test and the Supertest for the endpoint on the Test-DB.

before starting the test due to a problem with the ENV variable ``set ENV=test`` works fine with the Windows System, if your using linux (MacOs) I suggest of changing manually the value on the ``.env`` file to ``test`` then you can run the command:
```
npm run test
```
once you check all the test don't forget to revert the value to ``dev``
3. For running the TypeScript version on src folder, I use ```Nodemon``` to be able to see changes on the server while develop.
```
npm run dev
```