import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { __dirname } from "./config.js";
import route from "./routes/pdfRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import STATUS_CODES from "./constants/statusCodes.js";
import ERROR_MESSAGES from "./constants/errorMessages.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        origin: process.env.CORS_URL,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    })
);

app.use("/static", express.static(path.resolve(__dirname, "public")));

app.use("/api", route);
app.use('*',(req,res)=>res.status(STATUS_CODES.NOT_FOUND).json(ERROR_MESSAGES.ENDPOINT_NOT_FOUNT))

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`> server is running on port ${port}`);
});
