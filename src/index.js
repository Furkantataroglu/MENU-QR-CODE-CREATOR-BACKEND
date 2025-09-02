import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./data/prisma.js";
import userRoutes from "./routes/userRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import dishRoutes from "./routes/dishRoutes.js";
import publicMenuRoutes from "./routes/publicMenuRoutes.js";
import errorHandling from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

// API routes
app.use("/api", userRoutes);
app.use("/api", menuRoutes);
app.use("/api", dishRoutes);

// Public routes (QR kod ile erişilecek)
app.use("/", publicMenuRoutes);

app.get("/", async (req, res, next) => {
  try {
    const [row] = await prisma.$queryRaw`SELECT current_database() AS name`;
    res.send(`Database name is: ${row.name}`);
  } catch (err) {
    next(err);
  }
});

// error handler en sonda
app.use(errorHandling);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
