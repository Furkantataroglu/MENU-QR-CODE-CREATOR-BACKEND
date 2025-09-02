// src/repositories/userRepo.js
import prisma from "../data/prisma.js";


// 1) Tüm kullanıcılar
export const fetchAllUsers = () =>
  prisma.user.findMany({
    select: {
      id: true,
      email: true,
      // şifreyi dönmek istemiyorsan exclude et veya seçimini yap
    },
  });

// 2) Yeni kullanıcı
export const createUserRepo = ({ email, password }) =>
  prisma.user.create({
    data: { email, password },
  });

// 3) ID’ye göre kullanıcı
export const fetchUserById = (id) =>
  prisma.user.findUnique({
    where: { id: Number(id) },
  });

// 4) Güncelleme
export const updateUserRepo = (id, { email, password }) =>
  prisma.user.update({
    where: { id: Number(id) },
    data: { email, password },
  });

// 5) Silme
export const deleteUserRepo = (id) =>
  prisma.user.delete({
    where: { id: Number(id) },
  });
