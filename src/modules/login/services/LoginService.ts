import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import userPoll from '@shared/config/cognito';
import { AppError } from '@shared/errors/AppError';
import GetUserInfoService from './GetUserInfoService';

interface iLogin {
  username?: string,
  password?: string,
  provider: string
}

interface iReturnToApi {
  name?: string,
  familyName?: String,
  email?: string,
  address?: string,
  city?: string,
  phoneNumber?: string
}

interface iReturn {
  userInfos: iReturnToApi,
  token: string
}

class LoginService {
  public async run(infosToLogin: iLogin):Promise<string | iReturn> {
    if (infosToLogin.provider === 'Google') {
      return `${process.env.URLCLIENT}/login?client_id=${process.env.CLIENTID}&response_type=code&scope=email+openid+profile&redirect_uri=${process.env.URLCALLBACKLOGIN}`;
    }

    const user:Promise<string | unknown> = new Promise((resolve, reject) => {
      const authenticationDetails = new AuthenticationDetails({
        Username: infosToLogin.username as string,
        Password: infosToLogin.password as string,
      });

      const userData = {
        Username: infosToLogin.username as string,
        Pool: userPoll,
      };

      const cognitoUser = new CognitoUser(userData);

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess(result) {
          resolve(result.getAccessToken().getJwtToken());
        },
        onFailure(error) {
          reject(error);
        },
      });
    }).catch((error) => {
      throw new AppError(error as string, 400);
    });

    const tokenUser = await user;

    const getUserInfoService = new GetUserInfoService();
    const infosOfUser:iReturnToApi = await getUserInfoService.run(tokenUser);

    const retorno:iReturn = {
      userInfos: infosOfUser,
      token: tokenUser as string,
    };

    return retorno;
  }
}
export default LoginService;
