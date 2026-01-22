class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode || 500;
        this.isOperational = true;
        
        Error.captureStackTrace(this);
    }
}

module.exports = AppError;