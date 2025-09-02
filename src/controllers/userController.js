import {
  fetchAllUsers,
  createUserRepo,
  fetchUserById,
  updateUserRepo,
  deleteUserRepo,
} from "../repositories/userRepo.js";

// ortak response
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({ status, message, data });
};

export const createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.status = 400;
      throw error;
    }

    const user = await createUserRepo({ email, password });
    return handleResponse(res, 201, "User created successfully", user);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await fetchAllUsers();
    return handleResponse(res, 200, "Users fetched successfully", users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await fetchUserById(req.params.id);
    if (!user) return handleResponse(res, 404, "User not found");
    return handleResponse(res, 200, "User fetched successfully", user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { id } = req.params;

    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.status = 400;
      throw error;
    }

    const updatedUser = await updateUserRepo(id, { email, password });
    if (!updatedUser) return handleResponse(res, 404, "User not found");
    return handleResponse(res, 200, "User updated successfully", updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserRepo(id);
    if (!deletedUser) return handleResponse(res, 404, "User not found");
    return handleResponse(res, 200, "User deleted successfully", deletedUser);
  } catch (error) {
    next(error);
  }
};
