import express from 'express';
import authRouter from './auth/index.js';

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
  res.json({
    message: "API",
  });
});

apiRouter.use('/auth', authRouter);

export default apiRouter;