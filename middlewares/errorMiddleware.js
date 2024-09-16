import ERROR_MESSAGES from "../constants/errorMessages.js";
import STATUS_CODES from "../constants/statusCodes.js";

export default function errorMiddleware(err, req, res, next) {
    if (err.status) {
        return res.status(err.status).json(err.message);
    }

    return res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
}
