// src/repositories/dishRepo.js
import prisma from "../data/prisma.js";

// 1) Tüm yemekleri getir
export const fetchAllDishes = () =>
  prisma.dish.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      imageUrl: true,
      createdAt: true,
      menuId: true,
    },
  });

// 2) Menüye ait yemekleri getir
export const fetchDishesByMenuId = (menuId) =>
  prisma.dish.findMany({
    where: { menuId: Number(menuId) },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      imageUrl: true,
      createdAt: true,
      menuId: true,
    },
    orderBy: { createdAt: 'asc' },
  });

// 3) Kullanıcıya ait tüm yemekleri getir
export const fetchDishesByUserId = (userId) =>
  prisma.dish.findMany({
    where: {
      menu: {
        userId: Number(userId)
      }
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      imageUrl: true,
      createdAt: true,
      menuId: true,
      menu: {
        select: {
          id: true,
          title: true,
        }
      }
    },
    orderBy: { createdAt: 'asc' },
  });

// 4) ID'ye göre yemek getir
export const fetchDishById = (id) =>
  prisma.dish.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      imageUrl: true,
      createdAt: true,
      menuId: true,
    },
  });

// 5) Yeni yemek oluştur
export const createDishRepo = ({ name, description, price, imageUrl, menuId }) =>
  prisma.dish.create({
    data: { 
      name, 
      description, 
      price: parseFloat(price), 
      imageUrl, 
      menuId: Number(menuId) 
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      imageUrl: true,
      createdAt: true,
      menuId: true,
    },
  });

// 6) Yemek güncelle
export const updateDishRepo = (id, { name, description, price, imageUrl }) =>
  prisma.dish.update({
    where: { id: Number(id) },
    data: { 
      name, 
      description, 
      price: price ? parseFloat(price) : undefined, 
      imageUrl 
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      imageUrl: true,
      createdAt: true,
      menuId: true,
    },
  });

// 7) Yemek sil
export const deleteDishRepo = (id) =>
  prisma.dish.delete({
    where: { id: Number(id) },
  });

// 8) Kullanıcıya ait yemekleri sil
export const deleteDishesByUserId = (userId) =>
  prisma.dish.deleteMany({
    where: {
      menu: {
        userId: Number(userId)
      }
    },
  });
