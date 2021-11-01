import LoginService from '../services/LoginService';

describe('Login tests', () => {
  it('it is a test to validate if option to Login is Google', async () => {
    const loginService = new LoginService();
    const bodyToLogin = {
      provider: 'Google',
    };

    expect(await loginService.run(bodyToLogin)).toContain('https://');
  });

  it('it is a test to validate if login user is a bad login', async () => {
    const loginService = new LoginService();
    const bodyToLogin = {
      username: 'rafael.cepifanio@gmail.com',
      password: '123456',
      provider: 'Plataform',
    };

    await expect(loginService.run(bodyToLogin)).rejects.toMatchObject({ statusCode: 400 });
  });

  it('it is a test to validate if login user is well done', async () => {
    const loginService = new LoginService();
    const bodyToLogin = {
      username: 'rafael.cepifanio@gmail.com',
      password: 'A@a.123456',
      provider: 'Plataform',
    };

    await expect(loginService.run(bodyToLogin)).resolves.toMatchObject({ userInfos: { name: 'Rafael', email: 'rafael.cepifanio@gmail.com' } });
  });
});
