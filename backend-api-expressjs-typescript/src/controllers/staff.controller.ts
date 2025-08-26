import { Request, Response, NextFunction } from 'express';
import Staff from '../models/Staff.model';
import createHttpError from 'http-errors';
import * as staffService from '../services/staffs.service';

// Create new staff
export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { first_name, last_name, phone, email, password, store_id, manage_id } = req.body;

        const newStaff = await Staff.create({
            first_name,
            last_name,
            phone,
            email,
            password,
            store_id,
            manage_id,
        });

        res.status(201).json({
            status: 'success',
            message: 'Staff created successfully',
            data: newStaff,
        });
    } catch (error) {
        next(error);
    }
};

// Get all staffs with pagination
export const findAll = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 5 } = req.query;

        const staffs = await staffService.findAll({
            page: Number(page),
            limit: Number(limit),
        });

        res.json({
            status: 'success',
            message: 'Get all staffs successfully',
            data: staffs,
        });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};

// Get staff by ID
export const findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const staff = await staffService.findById(id);

        if (!staff) {
            return next(createHttpError(404, 'Staff not found'));
        }

        res.json({
            status: 'success',
            message: 'Staff found',
            data: staff,
        });
    } catch (error) {
        next(error);
    }
};

// Update staff by ID
export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const updated = await staffService.updateById(id, req.body);

        if (!updated) {
            return next(createHttpError(404, 'Staff not found or update failed'));
        }

        res.json({
            status: 'success',
            message: 'Staff updated successfully',
            data: updated,
        });
    } catch (error) {
        next(error);
    }
};

// Delete staff by ID
export const deleteStaff = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const deleted = await staffService.deleteById(id);

        if (!deleted) {
            return next(createHttpError(404, 'Staff not found'));
        }

        res.json({
            status: 'success',
            message: 'Staff deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};
