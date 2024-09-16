import multer from "multer";
import path from "path";
import fs from "fs";
import { __dirname } from "../config.js";
import ERROR_MESSAGES from "../constants/errorMessages.js";
import STATUS_CODES from "../constants/statusCodes.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.resolve(__dirname, "public");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
        const error = new Error(ERROR_MESSAGES.UNSUPPORTED_FILE_TYPE);
        error.status = STATUS_CODES.UNSUPPORTED_MEDIA_TYPE;
        return cb(error, false); 
    }
    cb(null, true); 
};

export default multer({
    storage,
    fileFilter,
});
