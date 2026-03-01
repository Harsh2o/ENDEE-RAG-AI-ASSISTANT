export const requestLogger = (req, res, next) => {
  const startedAt = Date.now();
  console.log(`➡ ${req.method} ${req.originalUrl}`);

  res.on("finish", () => {
    const durationMs = Date.now() - startedAt;
    console.log(
      `⬅ ${req.method} ${req.originalUrl} ${res.statusCode} (${durationMs}ms)`,
    );
  });

  next();
};
