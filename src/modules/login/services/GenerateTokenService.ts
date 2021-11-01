import axios from 'axios';
import { AppError } from '@/shared/errors/AppError';

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

class GenerateTokenService {
  public async run(code:string | unknown):Promise<string | iReturn> {
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.CLIENTID as string,
      code: code as string,
      redirect_uri: process.env.URLCALLBACKLOGIN as string,
    }).toString();

    const url = `${process.env.URLCLIENT}/oauth2/token?${
      params}`;

    const token = await axios.post(
      url,
      null,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    ).then((response) => (response.data.access_token)).catch((err) => {
      throw new AppError(err.response.data, 400);
    });

    return token;
  }
}
export default GenerateTokenService;
