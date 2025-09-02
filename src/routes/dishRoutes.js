import express from "express";
import {
  getAllDishes,
  getDishesByMenuId,
  getDishesByUserId,
  getDishById,
  createDish,
  updateDish,
  deleteDish,
} from "../controllers/dishController.js";

const router = express.Router();

router.post("/dishes", createDish);
router.get("/dishes", getAllDishes);
router.get("/dishes/:id", getDishById);
router.get("/menus/:menuId/dishes", getDishesByMenuId);
router.get("/users/:userId/dishes", getDishesByUserId);
router.put("/dishes/:id", updateDish);
router.delete("/dishes/:id", deleteDish);

export default router;
