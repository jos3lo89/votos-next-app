import bcrypt from "bcryptjs";

export const comparePassword = async (pwd: string, pwdHash: string) => {
  return await bcrypt.compare(pwd, pwdHash);
};

export const saltAndHashPassword = async (pwd: string) => {
  return await bcrypt.hash(pwd, 10);
};
