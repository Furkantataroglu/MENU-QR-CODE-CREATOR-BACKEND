import express from "express";
import {
  getAllMenus,
  getMenusByUserId,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
  regenerateMenuQR,
} from "../controllers/menuController.js";

const router = express.Router();

router.post("/menus", createMenu);
router.get("/menus", getAllMenus);
router.get("/menus/:id", getMenuById);
router.get("/users/:userId/menus", getMenusByUserId);
router.put("/menus/:id", updateMenu);
router.delete("/menus/:id", deleteMenu);
router.post("/menus/:id/regenerate-qr", regenerateMenuQR);

export default router;
