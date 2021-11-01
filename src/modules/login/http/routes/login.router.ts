import { Router } from 'express';
import Login from '@modules/login/services/LoginService';
import GenerateTokenService from '@modules/login/services/GenerateTokenService';

const routes = Router();

routes.post('/', async (req, res, next) => {
  const login = new Login();
  try {
    const retLogin = await login.run(req.body);
    res.status(200).json(retLogin);
  } catch (err) {
    next(err);
  }
});

routes.get('/social-login/:code', async (req, res, next) => {
  const { code } = req.params;
  const generateTokenService = new GenerateTokenService();
  try {
    const token = await generateTokenService.run(code);
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
});

export default routes;
