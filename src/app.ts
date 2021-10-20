import express from 'express';

const app: express.Application = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`listening in port ${PORT}`);
});

export default app;