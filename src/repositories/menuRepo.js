// src/repositories/menuRepo.js
import prisma from "../data/prisma.js";

// 1) Tüm menüleri getir
export const fetchAllMenus = () =>
  prisma.menu.findMany({
    select: {
      id: true,
      title: true,
      createdAt: true,
      userId: true,
      qrCode: true,
      qrData: true,
      dishes: {
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          imageUrl: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'asc' }
      }
    },
  });

// 2) Kullanıcıya ait menüleri getir
export const fetchMenusByUserId = (userId) =>
  prisma.menu.findMany({
    where: { userId: Number(userId) },
    select: {
      id: true,
      title: true,
      createdAt: true,
      userId: true,
      qrCode: true,
      qrData: true,
      dishes: {
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          imageUrl: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'asc' }
      }
    },
  });

// 3) ID'ye göre menü getir (dish'ler ile birlikte)
export const fetchMenuById = (id) =>
  prisma.menu.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      title: true,
      createdAt: true,
      userId: true,
      qrCode: true,
      qrData: true,
      dishes: {
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          imageUrl: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'asc' }
      }
    },
  });

// 4) Kullanıcıya ait belirli ID'de menü var mı kontrol et
export const fetchMenuByIdAndUserId = (id, userId) =>
  prisma.menu.findFirst({
    where: { 
      id: Number(id),
      userId: Number(userId)
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      userId: true,
      qrCode: true,
      qrData: true,
      dishes: {
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          imageUrl: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'asc' }
      }
    },
  });

// 5) Yeni menü oluştur
export const createMenuRepo = ({ title, userId }) =>
  prisma.menu.create({
    data: { title, userId: Number(userId) },
    select: {
      id: true,
      title: true,
      createdAt: true,
      userId: true,
      qrCode: true,
      qrData: true,
      dishes: {
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          imageUrl: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'asc' }
      }
    },
  });

// 6) Menü güncelle
export const updateMenuRepo = (id, { title }) =>
  prisma.menu.update({
    where: { id: Number(id) },
    data: { title },
    select: {
      id: true,
      title: true,
      createdAt: true,
      userId: true,
      qrCode: true,
      qrData: true,
      dishes: {
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          imageUrl: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'asc' }
      }
    },
  });

// 7) QR kod güncelle
export const updateMenuQRRepo = (id, { qrCode, qrData }) =>
  prisma.menu.update({
    where: { id: Number(id) },
    data: { qrCode, qrData },
    select: {
      id: true,
      title: true,
      createdAt: true,
      userId: true,
      qrCode: true,
      qrData: true,
      dishes: {
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          imageUrl: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'asc' }
      }
    },
  });

// 8) Menü sil
export const deleteMenuRepo = (id) =>
  prisma.menu.delete({
    where: { id: Number(id) },
  });

// 9) Kullanıcıya ait tüm menüleri sil
export const deleteMenusByUserId = (userId) =>
  prisma.menu.deleteMany({
    where: { userId: Number(userId) },
  });
