export const config = {
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/fitness",
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "change_me_in_production",
  nodeEnv: process.env.NODE_ENV || "development",
};