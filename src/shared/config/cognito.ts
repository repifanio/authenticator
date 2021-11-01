import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: process.env.USERPOOLID as string,
  ClientId: process.env.CLIENTID as string,
};

const userPool = new CognitoUserPool(poolData);

export default userPool;
