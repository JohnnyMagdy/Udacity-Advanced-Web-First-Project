import express from 'express';
import images from './api/images';

const routes = express();
const port = 3000;

routes.get('/', (req, res) => {
    res.send("api");
});
routes.use('/images', images);

export default routes;