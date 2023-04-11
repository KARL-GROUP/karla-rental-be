import express from "express";
import { validate } from "../middleware/validate";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import {
  deleteOrderSchema,
  getOrdersSchema,
  newOrderSchema,
  updateOrderSchema,
} from "../schemas/order.schema";
import {
  createOrderHnadler,
  deleteOrderHandler,
  getOrdersHnadler,
  updateOrderHandler,
} from "../controllers/order.controller";

const router = express.Router();

router.post("/", validate(newOrderSchema), createOrderHnadler);

router.use(deserializeUser, requireUser);

router.get("/", validate(getOrdersSchema), getOrdersHnadler);

router.put("/:orderId", validate(updateOrderSchema), updateOrderHandler);

router.delete("/:orderId", validate(deleteOrderSchema), deleteOrderHandler);

export default router;
