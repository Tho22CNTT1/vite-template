import { AnySchema, ValidationError } from 'yup';
import { Request, Response, NextFunction } from 'express';

const validateSchemaYup = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });

        next();
    } catch (err) {
        if (err instanceof ValidationError) {
            return res.status(400).json({
                statusCode: 400,
                message: err.errors,
                typeError: 'validateSchema',
            });
        }

        res.status(500).json({
            statusCode: 500,
            message: 'Unknown validation error',
            typeError: 'validateSchemaUnknown',
        });
    }
};

export default validateSchemaYup;
