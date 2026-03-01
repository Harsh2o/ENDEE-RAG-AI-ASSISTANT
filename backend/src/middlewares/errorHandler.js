export const notFoundHandler = (req, res) => {
  console.warn(`⚠ Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: "Route not found" });
};

export const globalErrorHandler = (err, req, res, next) => {
  console.error("❌ UNHANDLED ERROR:", err);
  res.status(500).json({ error: "Internal server error" });
};
