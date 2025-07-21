import Product from '../models/Product.model';
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.json({ message: 'success', products });
    }
    catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
