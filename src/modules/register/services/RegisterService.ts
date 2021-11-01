import { AppError } from '@shared/errors/AppError';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import userPool from '@shared/config/cognito';

interface iNewUser {
    name: string,
    email: string,
    phoneNumber: string,
    familyName: string,
    address: string,
    city: string,
    password: string
}

class RegisterService {
  public async run(userInfos: iNewUser):Promise<string | unknown> {
    const attributesList: CognitoUserAttribute[] = [];

    attributesList.push(new CognitoUserAttribute({ Name: 'name', Value: userInfos.name }));
    attributesList.push(new CognitoUserAttribute({ Name: 'email', Value: userInfos.email }));
    attributesList.push(new CognitoUserAttribute({ Name: 'phone_number', Value: userInfos.phoneNumber }));
    attributesList.push(new CognitoUserAttribute({ Name: 'family_name', Value: userInfos.familyName }));
    attributesList.push(new CognitoUserAttribute({ Name: 'address', Value: userInfos.address }));
    attributesList.push(new CognitoUserAttribute({ Name: 'custom:city', Value: userInfos.city }));

    const user:Promise<string | unknown> = new Promise((resolve, reject) => {
      userPool.signUp(
        userInfos.email,
        userInfos.password,
        attributesList,
        attributesList,
        (err, result) => {
          if (err) {
            reject(err.message);
          } else {
            const cognitoUser = result?.user;
            resolve(`Usuário criado com sucesso. Username: ${cognitoUser?.getUsername()} `);
          }
        },
      );
    }).catch((error) => {
      throw new AppError(error as string, 400);
    });

    const retorno = await user;
    return retorno;
  }
}
export default RegisterService;
