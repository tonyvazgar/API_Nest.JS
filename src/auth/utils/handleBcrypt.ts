import * as bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

const plainToHash = async (plainPassword: string): Promise<string> => {
  const hash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
  return hash;
};

const comparePlainToHash = async (
  plainPassword: string,
  hashPassword: string,
) => {
  const compared = await bcrypt.compare(plainPassword, hashPassword);
  return compared;
};

export { plainToHash, comparePlainToHash };
