import express from 'express';
import images from './api/images';

const routes = express();

routes.get('/', (req: express.Request, res: express.Response): void => {
  res.send('api');
});

routes.use('/images', images);

export default routes;
