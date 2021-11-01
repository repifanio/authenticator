import Register from '../services/RegisterService';

describe('Register tests', () => {
  it('it is a test to create a invalid user whith a email already exist', async () => {
    const register = new Register();
    const user = {
      name: 'Rafael',
      email: 'rafael.cepifanio@gmail.com',
      phoneNumber: '+5551995086142',
      familyName: 'Epifanio',
      address: 'Beco do Binga 105',
      city: 'Barra do Ribeiro',
      password: 'A@a.123456',
    };

    await register.run(user).catch((e) => expect(e.message).toEqual('User already exists'));
  });

  it('it is a test to create a invalid user whith a invalid email', async () => {
    const register = new Register();
    const user = {
      name: 'Rafael',
      email: 'rafael.cepifaniogmail.com',
      phoneNumber: '+5551995086142',
      familyName: 'Epifanio',
      address: 'Beco do Binga 105',
      city: 'Barra do Ribeiro',
      password: 'A@a.123456',
    };

    await register.run(user).catch((e) => expect(e.message).toEqual('Invalid email address format.'));
  });

  it('it is a test to create a invalid user whith a invalid phone_number', async () => {
    const register = new Register();
    const user = {
      name: 'Rafael',
      email: 'rafael.cepifanio@gmail.com',
      phoneNumber: '5551995086142',
      familyName: 'Epifanio',
      address: 'Beco do Binga 105',
      city: 'Barra do Ribeiro',
      password: 'A@a.123456',
    };

    await register.run(user).catch((e) => expect(e.message).toEqual('Invalid phone number format.'));
  });

  it('it is a test to create a invalid user whith a invalid password', async () => {
    const register = new Register();
    const user = {
      name: 'Rafael',
      email: 'rafael.cepifanio@gmail.com',
      phoneNumber: '+5551995086142',
      familyName: 'Epifanio',
      address: 'Beco do Binga 105',
      city: 'Barra do Ribeiro',
      password: '123456',
    };

    await register.run(user).catch((e) => expect(e.message).toEqual('Password did not conform with policy: Password not long enough'));
  });
});
