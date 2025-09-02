import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from '../../node_modules/@prisma/client/index.js';
const prisma = new PrismaClient();
export default prisma;
