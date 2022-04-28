import express from 'express';

const logger = (req: express.Request, res: express.Response, next: Function): void => {
    let url = req.path;

    var start = new Date().getTime();

    next();

    var end = new Date().getTime();
    var time = end - start;
    console.log(`${url} was visited. It took ${time}ms to load`);
}

export default logger;