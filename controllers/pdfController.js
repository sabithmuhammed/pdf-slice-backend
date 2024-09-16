import path from "path";
import ERROR_MESSAGES from "../constants/errorMessages.js";
import STATUS_CODES from "../constants/statusCodes.js";
import fs from "fs/promises";
import { __dirname } from "../config.js";
import { PDFDocument } from "pdf-lib";

export const uploadPdf = async (req, res, next) => {
    try {
        const file = req.file || null;
        if (file) {
            return res.status(STATUS_CODES.OK).json({ filename: file.filename });
        }
        const error = new Error(ERROR_MESSAGES.FILE_NOT_FOUND);
        error.status = STATUS_CODES.BAD_REQUEST;
        throw error;
    } catch (error) {
        next(error);
    }
};



export const createNewPdf = async (req, res, next) => {
    try {
        const { filename } = req.params;
        const pageNumbers = req.query.pageNumbers
            ? req.query.pageNumbers.map(Number)
            : [];
        const filePath = path.resolve(__dirname, "public", filename);
        const pdfBuffer = await fs.readFile(filePath);
        const pdfDoc = await PDFDocument.load(pdfBuffer);
        const newPdfDoc = await PDFDocument.create();

        const pages = pdfDoc.getPages();
        for (const pageNumber of pageNumbers) {
            if (pageNumber > 0 && pageNumber <= pages.length) {
                const [extractedPage] = await newPdfDoc.copyPages(pdfDoc, [
                    pageNumber - 1,
                ]);
                newPdfDoc.addPage(extractedPage);
            } else {
                console.error(`Page number ${pageNumber} is out of bounds.`);
            }
        }

        const newPdfBytes = await newPdfDoc.save();
        const tempFilePath = path.resolve(__dirname,"public",`${Date.now()}.pdf`)
        await fs.writeFile(tempFilePath, newPdfBytes);
        res.download(tempFilePath, 'extracted-pages.pdf', (err) => {
            if (err) {
              console.error('Error sending file:', err);
              res.status(500).send('Error generating PDF');
            } else {
              // Clean up the temporary file
              fs.unlink(tempFilePath).catch(console.error);
            }
          });
    } catch (error) {
        next(error);
    }
};
