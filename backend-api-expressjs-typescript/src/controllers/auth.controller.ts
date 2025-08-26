import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import { loginService, refreshTokenService } from '../services/auth.service';
import { sendJsonSuccess } from '../helpers/response.helper';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const staff = await loginService(email, password);

    sendJsonSuccess(res, {
      message: 'Login successful',
      staff: staff.staff,
      accessToken: staff.accessToken,
      refreshToken: staff.refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw createError(401, 'Refresh token required');
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET!) as any;

    const newTokens = await refreshTokenService(decoded.id); // 👈 chỉ truyền id

    res.json(newTokens);
  } catch (error) {
    next(createError(403, 'Invalid refresh token'));
  }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const staff = res.locals.staff;
    sendJsonSuccess(res, staff, 1);
  } catch (error) {
    next(error);
  }
}

