import {
  fetchAllDishes,
  fetchDishesByMenuId,
  fetchDishesByUserId,
  fetchDishById,
  createDishRepo,
  updateDishRepo,
  deleteDishRepo,
} from "../repositories/dishRepo.js";

// ortak response
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({ status, message, data });
};

export const createDish = async (req, res, next) => {
  try {
    const { name, description, price, imageUrl, menuId } = req.body;
    if (!name || !price || !menuId) {
      const error = new Error("Name, price and menuId are required");
      error.status = 400;
      throw error;
    }

    const dish = await createDishRepo({ name, description, price, imageUrl, menuId });
    return handleResponse(res, 201, "Dish created successfully", dish);
  } catch (error) {
    next(error);
  }
};

export const getAllDishes = async (req, res, next) => {
  try {
    const dishes = await fetchAllDishes();
    return handleResponse(res, 200, "Dishes fetched successfully", dishes);
  } catch (error) {
    next(error);
  }
};

export const getDishesByMenuId = async (req, res, next) => {
  try {
    const { menuId } = req.params;
    const dishes = await fetchDishesByMenuId(menuId);
    return handleResponse(res, 200, "Menu dishes fetched successfully", dishes);
  } catch (error) {
    next(error);
  }
};

export const getDishesByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const dishes = await fetchDishesByUserId(userId);
    return handleResponse(res, 200, "User dishes fetched successfully", dishes);
  } catch (error) {
    next(error);
  }
};

export const getDishById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dish = await fetchDishById(id);
    if (!dish) return handleResponse(res, 404, "Dish not found");
    return handleResponse(res, 200, "Dish fetched successfully", dish);
  } catch (error) {
    next(error);
  }
};

export const updateDish = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, imageUrl } = req.body;

    if (!name && !description && !price && !imageUrl) {
      const error = new Error("At least one update field is required");
      error.status = 400;
      throw error;
    }

    const updatedDish = await updateDishRepo(id, { name, description, price, imageUrl });
    if (!updatedDish) return handleResponse(res, 404, "Dish not found");
    return handleResponse(res, 200, "Dish updated successfully", updatedDish);
  } catch (error) {
    next(error);
  }
};

export const deleteDish = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedDish = await deleteDishRepo(id);
    if (!deletedDish) return handleResponse(res, 404, "Dish not found");
    return handleResponse(res, 200, "Dish deleted successfully", deletedDish);
  } catch (error) {
    next(error);
  }
};
