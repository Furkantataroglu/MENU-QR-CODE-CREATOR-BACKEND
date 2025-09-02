import {
  fetchAllMenus,
  fetchMenusByUserId,
  fetchMenuById,
  createMenuRepo,
  updateMenuRepo,
  deleteMenuRepo,
  updateMenuQRRepo,
} from "../repositories/menuRepo.js";
import { generateQRCode, prepareMenuDataForQR } from "../services/qrService.js";

// ortak response
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({ status, message, data });
};

export const createMenu = async (req, res, next) => {
  try {
    const { title, userId } = req.body;
    if (!title || !userId) {
      const error = new Error("Title and userId are required");
      error.status = 400;
      throw error;
    }

    // Menüyü oluştur
    const menu = await createMenuRepo({ title, userId });
    
    // QR kod oluştur
    const qrData = prepareMenuDataForQR(menu);
    const qrCode = await generateQRCode(qrData);
    
    // QR kod bilgisini veritabanında sakla
    const menuWithQR = await updateMenuQRRepo(menu.id, { 
      qrCode, 
      qrData: JSON.stringify(qrData) 
    });

    return handleResponse(res, 201, "Menu created successfully", menuWithQR);
  } catch (error) {
    next(error);
  }
};

export const getAllMenus = async (req, res, next) => {
  try {
    const menus = await fetchAllMenus();
    return handleResponse(res, 200, "Menus fetched successfully", menus);
  } catch (error) {
    next(error);
  }
};

export const getMenusByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const menus = await fetchMenusByUserId(userId);
    return handleResponse(res, 200, "User menus fetched successfully", menus);
  } catch (error) {
    next(error);
  }
};

export const getMenuById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const menu = await fetchMenuById(id);
    if (!menu) return handleResponse(res, 404, "Menu not found");
    return handleResponse(res, 200, "Menu fetched successfully", menu);
  } catch (error) {
    next(error);
  }
};

export const updateMenu = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
      const error = new Error("Title is required");
      error.status = 400;
      throw error;
    }

    const updatedMenu = await updateMenuRepo(id, { title });
    if (!updatedMenu) return handleResponse(res, 404, "Menu not found");
    return handleResponse(res, 200, "Menu updated successfully", updatedMenu);
  } catch (error) {
    next(error);
  }
};

export const deleteMenu = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedMenu = await deleteMenuRepo(id);
    if (!deletedMenu) return handleResponse(res, 404, "Menu not found");
    return handleResponse(res, 200, "Menu deleted successfully", deletedMenu);
  } catch (error) {
    next(error);
  }
};

// Menü için QR kod yeniden oluştur
export const regenerateMenuQR = async (req, res, next) => {
  try {
    const { id } = req.params;
    const menu = await fetchMenuById(id);
    
    if (!menu) return handleResponse(res, 404, "Menu not found");
    
    // QR kod yeniden oluştur
    const qrData = prepareMenuDataForQR(menu);
    const qrCode = await generateQRCode(qrData);
    
    // QR kod bilgisini veritabanında güncelle
    const menuWithQR = await updateMenuQRRepo(id, { 
      qrCode, 
      qrData: JSON.stringify(qrData) 
    });
    
    return handleResponse(res, 200, "QR kod başarıyla yeniden oluşturuldu", menuWithQR);
  } catch (error) {
    next(error);
  }
};
