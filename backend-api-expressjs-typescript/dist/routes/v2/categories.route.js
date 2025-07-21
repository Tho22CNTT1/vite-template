import express from 'express';
const router = express.Router();
// Mảng dữ liệu mẫu
let categories = [
    { id: 1, name: 'E' },
    { id: 2, name: 'B' },
    { id: 3, name: 'N' },
];
// GET all categories
router.get('/categories', (req, res) => {
    res.status(200).json({
        statusCode: 200,
        message: 'Success',
        data: categories,
    });
});
// GET category by id
router.get('/categories/:id', (req, res) => {
    const { id } = req.params;
    const category = categories.find(cat => cat.id === parseInt(id));
    if (!category) {
        return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({
        statusCode: 200,
        message: 'Success',
        data: category,
    });
});
// POST - create new category (giả lập tạo mới với id từ URL)
router.post('/categories/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }
    const newCategory = { id: parseInt(id), name };
    categories.push(newCategory);
    res.status(201).json({
        statusCode: 201,
        message: 'Category created',
        data: newCategory,
    });
});
// PUT - update category by id
router.put('/categories/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const category = categories.find(cat => cat.id === parseInt(id));
    if (!category) {
        return res.status(404).json({ message: 'Category not found' });
    }
    category.name = name || category.name;
    res.status(200).json({
        statusCode: 200,
        message: 'Category updated',
        data: category,
    });
});
// DELETE - remove category by id
router.delete('/categories/:id', (req, res) => {
    const { id } = req.params;
    const index = categories.findIndex(cat => cat.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ message: 'Category not found' });
    }
    const deleted = categories.splice(index, 1)[0];
    res.status(200).json({
        statusCode: 200,
        message: 'Category deleted',
        data: deleted,
    });
});
export default router;
