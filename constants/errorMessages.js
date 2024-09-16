const STATUS_CODES = {
    // General Errors
    INTERNAL_SERVER_ERROR:
        "An unexpected error occurred. Please try again later.",
    INVALID_REQUEST:
        "The request could not be processed. Please check the input and try again.",

    // Authentication Errors
    UNAUTHORIZED: "You must be logged in to access this resource.",
    FORBIDDEN: "You do not have permission to access this resource.",

    // File Upload Errors
    FILE_TOO_LARGE: "The file is too large. Please upload a smaller file.",
    UNSUPPORTED_FILE_TYPE: "Unsupported file type. Only PDF files are allowed.",
    FILE_NOT_FOUND: "The requested file was not found.",
    ENDPOINT_NOT_FOUNT: "The requested endpoint could not be found.",

    // Database Errors
    RECORD_NOT_FOUND: "The requested record could not be found.",
    DATABASE_ERROR:
        "There was a problem with the database. Please try again later.",
};

export default STATUS_CODES;
