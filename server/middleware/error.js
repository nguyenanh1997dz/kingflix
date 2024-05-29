class HandleError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

const pageNotFound = (req, res, next) => {
    const error = new HandleError(404, `Page Not Found: ${req.originalUrl}`); 
    next(error);
};

const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;
    return res.status(err.statusCode).json({ message: err.message });
};

module.exports = { errorMiddleware, pageNotFound , HandleError };
