import { Router } from 'express';
import Register from '@modules/register/http/routes/register.router';
import Login from '@modules/login/http/routes/login.router';

const routes = Router();

routes.use('/register', Register);
routes.use('/login', Login);

routes.get('/status', (req, res) => {
  res.status(200).json({ status: 'Aplicação online 🤯' });
});

export default routes;
