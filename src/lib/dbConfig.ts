// fullstack-fuel/src/lib/dbConfig.ts

// NOTE: Removed hardcoded credentials for security.
// Frontend code must never include database credentials or connection strings.
// Use the backend to handle database connections and secret values.

export const getMongoConnectionString = () => {
  throw new Error(
    "Database connection strings must not be used in frontend code. Use the backend server to connect to MongoDB."
  );
};

export const logDbConnectionStatus = () => {
  console.warn(
    "dbConfig: frontend module called. Database connections belong on the server. Check server/lib/dbConfig.js for server-side implementation."
  );
};