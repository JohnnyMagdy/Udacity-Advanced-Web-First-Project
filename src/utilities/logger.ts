import express from 'express';

const logger = (
  req: express.Request,
  res: express.Response,
  next: any
): void => {
  const url = req.path;

  const start = new Date().getTime();

  next();

  const end = new Date().getTime();
  const time = end - start;
  console.log(`${url} was visited. It took ${time}ms to load`);
};

export default logger;
