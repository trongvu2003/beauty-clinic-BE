const { ZodError } = require("zod");

const errorHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    const errors = {};
    err.errors.forEach((e) => {
      const key = e.path.join(".");
      errors[key] = [...(errors[key] ?? []), e.message];
    });
    return res
      .status(422)
      .json({ success: false, message: "Validation failed", errors });
  }

  const status = err.statusCode || 500;
  const message = err.message || "Internal server error";

  if (status === 500) {
    console.error("Unexpected error:", err);
  }

  res.status(status).json({ success: false, message });
};

module.exports = errorHandler;
