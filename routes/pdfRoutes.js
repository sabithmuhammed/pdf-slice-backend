import { Router } from "express";
import multerMiddleware from "../middlewares/multerMiddleware.js";
import { createNewPdf, uploadPdf } from "../controllers/pdfController.js";

const route = Router();

route.post("/upload", multerMiddleware.single("pdf"), uploadPdf);
route.get("/download/:filename", createNewPdf);

export default route;
