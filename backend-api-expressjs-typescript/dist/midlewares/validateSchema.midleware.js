import { ValidationError } from 'yup';
const validateSchemaYup = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });
        next();
    }
    catch (err) {
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
