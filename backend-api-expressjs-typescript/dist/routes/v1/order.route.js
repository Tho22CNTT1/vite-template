// src/routes/order.route.ts
import { Router } from "express";
import { OrderController } from "../../controllers/order.controller";
const router = Router();
router.get("/", OrderController.getAll); // GET all orders
router.get("/:id", OrderController.getById); // GET order by id
router.post("/", OrderController.create); // CREATE new order
router.put("/:id", OrderController.update); // UPDATE order by id
router.delete("/:id", OrderController.remove); // DELETE order by id
export default router;
