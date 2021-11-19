import bodyParser from 'body-parser';
import express from 'express';
import orders_routes from './handlers/orders_handler';
import products_routes from './handlers/products_handler';
import user_routes from './handlers/users_handler';
import cors from 'cors';

const app: express.Application = express();
const PORT = 3000;

app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.get('/', (_req, res) => {
  res.send('Welcome Screen');
});

products_routes(app);
user_routes(app);
orders_routes(app);

app.listen(PORT, () => {
  console.log(`listening in port ${PORT}`);
});

export default app;
