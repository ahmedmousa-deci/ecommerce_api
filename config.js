// Environment Variables handling
import "dotenv/config";

const config = {
  port: process.env.PORT || 3000,
  db_url: process.env.DB_URL,
};

if (!config.db_url) {
  console.error(
    "The database url is missing (DB_URL) in the enviroment variables (.env)",
  );
  process.exit(1);
}

export default config;
