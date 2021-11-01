import GenerateTokenService from '../services/GenerateTokenService';

describe('Generate token tests', () => {
  it('it is a test to validate if code is invalid', async () => {
    const generateTokenService = new GenerateTokenService();
    const code = 'f53ceee5-fc1f-4d93-9e15-c47d99d0d59e';

    await expect(generateTokenService.run(code)).rejects.toMatchObject({ statusCode: 400 });
  });
});
