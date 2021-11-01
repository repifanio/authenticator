import { Router } from 'express';
import RegisterService from '@modules/register/services/RegisterService';

const routes = Router();

routes.post('/', async (req, res, next) => {
  const registerService = new RegisterService();

  try {
    const userCreated = await registerService.run(req.body);
    res.status(200).json({ message: userCreated });
  } catch (err) {
    next(err);
  }
});

export default routes;
