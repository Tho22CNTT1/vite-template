// src/routes/v1/test.route.ts
import { Router } from 'express';
import { AppDataSource } from '../../data-source';
import { Test } from '../../entities/Test.entity';
import { ProductRepository } from '../../repository/product.repository';
import { Like, MoreThan } from 'typeorm';
const router = Router();
const testRepository = AppDataSource.getRepository(Test);

router.get('/', async (req, res) => {
    //1 select *
    //const products = await ProductRepository.find()
    //2 select product name, price from products
    /* const products = await ProductRepository.find({
        select: {
            name: true,
            price: true
        }
    }) */
    //3with where
    /*     const products = await ProductRepository.find({
            select: {
                name: true,
                price: true
            },
            where: {
                modelYear: 1989
            }
        }) */
    //4 with modelYear>1989
    /* const products = await ProductRepository.find({
        select: {
            name: true,
            price: true,
            modelYear: true
        },
        where: {
            modelYear: MoreThan(1989)
        }
    }) */
    //5 with like
    /* const products = await ProductRepository.find({
        select: {
            name: true,
            price: true,
            modelYear: true
        },
        where: {
            name: Like('%Granite%')
        }
    }) */
    //6 sắp xếp order by
    /* const products = await ProductRepository.find({
        select: {
            name: true,
            price: true,
            modelYear: true
        },
        order: {
            //price: 'ASC'
            name: 'ASC',
            price: 'DESC'
        }
    }) */
    //7 phân trang
    /* const { page = '1', limit = '5' } = req.query;
    const products = await ProductRepository.find({
        select: {
            id: true,
            name: true,
            price: true,
            modelYear: true
        },

        skip: (Number(page) - 1) * Number(limit),//vị trí bắt đầu
        take: Number(limit),// số lượng cần lấy
    }) */
    //8 join với category, brand
    /* const { page = '1', limit = '5' } = req.query;
    const products = await ProductRepository.find({
        select: {
            id: true,
            name: true,
            price: true,
            modelYear: true,
            category: {
                name: true // chỉ lấy category name
            },
            brand: {
                name: true // chỉ lấy brand name
            }
        },
        relations: {
            category: true,
            brand: true
        },
        where: {
            modelYear: MoreThan(1989)
        },
        skip: (Number(page) - 1) * Number(limit),//vị trí bắt đầu
        take: Number(limit),// số lượng cần lấy
    }) */
    //9 select with count
    /* const count = await ProductRepository.countBy({
        modelYear: MoreThan(1989)
    }) */
    //10 thực hiên sql thuần
    // dễ bị lỗi sql injection
    const products = await ProductRepository.query("select * from products")
    res.json({
        products,
    });
});

export default router;
