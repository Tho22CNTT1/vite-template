import express from "express";
import Test from "../../models/Test.model";
const router = express.Router();
import Product from "../../models/Product.model";
router.get('/test', async (req, res) => {
    const items = await Test.find({});
    const item = await Test.create({
        firstName: "John",
        lastName: "Doe",
        age: 30,
    });
    item.save;
    /* await Test.insertMany([
        { firstName: "Alice", lastName: "Smith", age: 28, phone: 12345 },
        { firstName: "Bob", lastName: "John", age: 23, phone: 54885 },
        { firstName: "Char", lastName: "Bon", age: 2, phone: 3483584 },
    ]) */
    //2.1 Xóa theo ID
    //await Test.findByIdAndDelete("687cad3a2f0535525f37a408");
    //2.2 xóa theo điều kiện
    /* await Test.findOneAndDelete({ firstName: 'Alice' });
    res.json({ message: 'Test is working' }) */
    //3.1 cập nhật theo id
    /* await Test.findByIdAndUpdate("687cbf3c6cea016f59d0027c", {
        firstName: "update"
    }) */
    //3.2 cập nhật theo điều kiện khác
    /* await Test.findOneAndUpdate({ lastName: 'Jhon' }, {
        age: 36
    })
 */
    //4.1 tìm tất cả
    //const products = await Product.find();
    //4.2 select 1 số trường
    //const products = await Product.find().select("product_name price");
    //4.3 select 1 số trường
    //const products = await Product.find()
    //.select("-updatedAt -createdAt");
    //4.4 tìm và sắp xếp
    /* const products = await Product.find()
        .select("-updatedAt -createdAt")
        .sort({ product_name: 1, price: -1 }) */
    //4.5 tìm với điều kiện
    /* const products = await Product.find({
        //model_year: 1934
        stock: { $gte: 10 }
    });
 */
    //4.6 toán tử and
    /* const products = await Product.find({
        $and: [
            { stock: { $gte: 10 } },
            { price: { $gte: 900 } }
        ]
    }) */
    //4.7 tìm với liked
    /* const products = await Product.find({
        product_name: { $regex: "Bike5", $options: "i" }
    }).select("-updatedAt -createdAt") */
    /* const products = await Product.find({
        phone: { $regex: '^098', $options: "i" }
    }) */
    //4.8 tìm và phân trang
    /* const currentPage = 2;
    const pageSize = 5; // số bản ghi mỗi trang
    const products = await Product.find({})
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize)
    */
    //4.9 tìm kiếm với populate
    const products = await Product
        .find()
        .populate("category_id", "category_name")
        .populate("brand_id", "brand_name")
        .select("-updatedAt -createdAt");
    res.json({ message: "working", products });
});
export default router;
