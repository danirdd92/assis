import app from "./src/server";
import dotenv from "dotenv";

const PORT = process.env.PORT || 3000;
dotenv.config();

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log(err);
  console.log("UNCAUGHT EXCEPTION. Shutting down...");
  process.exit(1);
});

const server = app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
  console.log(`Running in ${process.env.NODE_ENV} enviorment`);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("UNHANDLED REJECTION. Shutting down...");
  server.close(() => process.exit(1));
});

process.on("SIGTERM", () => {
  console.log("SIGTERM RECEIVED. Shutting down gracefully!");
  server.close(() => {
    console.log("Process terminated by SIGTERM!");
  });
});
