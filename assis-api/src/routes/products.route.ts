import { Router } from "express";
import { db } from "../db";
import { products } from "../db/schema";
export const productsRoute = Router();

productsRoute.get("/", async (req, res) => {
  try {
    const data = await db.select().from(products);
    return res.json(data);
  } catch (error) {
    console.error(error);
  }
});
