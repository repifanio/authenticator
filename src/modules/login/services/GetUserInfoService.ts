import { AppError } from '@shared/errors/AppError';
import AWS from 'aws-sdk';

interface iReturnOfCognito {
  Name: string,
  Value: string
}

interface iReturnToApi {
  name?: string,
  familyName?: String,
  email?: string,
  address?: string,
  city?: string,
  phoneNumber?: string
}

class GetUserInfoService {
  public async run(token:string | unknown):Promise<iReturnToApi> {
    AWS.config.region = process.env.AWS_COGNITO_REGION;
    const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
    const userInfos:Promise<string | unknown> = new Promise((resolve, reject) => {
      cognitoidentityserviceprovider.getUser({ AccessToken: token as string }, (erro, data) => {
        if (erro) {
          reject(erro);
        }
        console.log(data);
        const retorno = data.UserAttributes;
        resolve(retorno);
      });
    }).catch((error) => {
      throw new AppError(error as string, 400);
    });

    let profile:iReturnOfCognito[] = [];
    profile = await userInfos as iReturnOfCognito[];
    const ret:iReturnToApi = {};

    profile.forEach((item) => {
      switch (item.Name) {
        case 'name':
          ret.name = item.Value;
          break;
        case 'family_name':
          ret.familyName = item.Value;
          break;
        case 'email':
          ret.email = item.Value;
          break;
        case 'address':
          ret.address = item.Value;
          break;
        case 'custom:city':
          ret.city = item.Value;
          break;
        case 'phone_number':
          ret.phoneNumber = item.Value;
          break;
        default:
          break;
      }
    });

    return ret;
  }
}
export default GetUserInfoService;
