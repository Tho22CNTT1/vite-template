/* import Staff from "../models/Staff.model";
import createError from "http-errors";
import bcrypt from "bcrypt";
import { IStaffEntity } from "../types/model";
import { generateAccessToken, generateRefreshToken } from "../ultis/token.ultis";
import type { IStaffDoc } from "../models/Staff.model";

// Hàm xác thực login
const verifyUserByCredentials = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const staff = await Staff.findOne({ email });
  if (!staff) {
    throw createError(400, "Email or password is invalid");
  }

  const staffDoc = staff as IStaffDoc;

  const isMatch = await bcrypt.compare(password, staffDoc.password);
  if (!isMatch) {
    throw createError(400, "Email or password is invalid");
  }

  const accessToken = generateAccessToken({
    id: staffDoc._id.toString(),
    email: staffDoc.email,
    role: staffDoc.roles[0],
  });

  const refreshToken = generateRefreshToken({
    id: staffDoc._id.toString(),
    email: staffDoc.email,
    role: staffDoc.roles[0],
  });


  return {
    user: {
      id: staffDoc._id,
      email: staffDoc.email,
      fullName: staffDoc.fullName,
      roles: staffDoc.roles,
    },
    accessToken,
    refreshToken,
  };
};


const refreshTokenService = async (staff: {
  id: string;
  email: string;
  role: string;
}) => {
  const accessToken = generateAccessToken(staff);
  return { accessToken };
};

export { verifyUserByCredentials as loginService, refreshTokenService };
 */