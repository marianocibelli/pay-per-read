import path from 'path';
import express from 'express';
import cors from 'cors';

import router from './routes/router';
import apiRouter from './routes/api';

const app = express();
const assets = express.static(path.join(__dirname, '../'));

app.use(assets);
app.use(cors());

app.use('/api', apiRouter)
app.get('*', router);

export default app;
