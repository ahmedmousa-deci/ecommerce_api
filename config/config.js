// Environment Variables handling
import "dotenv/config";

const config = {
  port: process.env.PORT || 3000,
  db_url: process.env.MONGO_URL,
  node_env: process.env.NODE_ENV || "development",
};

if (!config.db_url) {
  console.error(
    "The database url is missing (MONGO_URL) in the enviroment variables (.env)",
  );
  process.exit(1);
}

export default config;
