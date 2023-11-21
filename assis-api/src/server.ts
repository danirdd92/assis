import express from "express";
import { logger } from "./logger";
import expressWinston from "express-winston";
import { productsRoute } from "./routes";
import cors from "cors";
const app = express();

app.use(expressWinston.logger(logger));
app.use(cors());
app.use("/api/products", productsRoute);

export default app;
