export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  MONDO_DB_URL: process.env.MONDO_DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
});
