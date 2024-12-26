const ERROR_RESPONSE = (res, error) => {
    console.error("Error:", error);
  
    // Check if the error is a MongoDB Duplicate Key Error
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(409).json({
        status: false,
        message: `Duplicate entry for ${field}: ${error.keyValue[field]}`
      });
    }
  
    // If error is a validation error (optional, for Mongoose/other validation)
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        status: false,
        message: "Validation error",
        errors: messages
      });
    }
  
    // Default to Internal Server Error for any other type of errors
    if (!res.headersSent) {
      return res.status(500).json({
        status: false,
        message: error.message || "Internal Server Error",
        error
      });
    }
  };
  
  module.exports = ERROR_RESPONSE;
  