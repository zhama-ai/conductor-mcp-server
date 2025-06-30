import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenv.config();

// GOOGLE_API_KEY=AIzaSyCrzfn679bO8hcRG5ixAtGjS4FZ3GxJVhY
// GOOGLE_SEARCH_ENGINE_ID=9212554642e204c7a
// Define validation schema for environment variables
const envSchema = z.object({
  PORT: z.string().transform(Number).default('3000'),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  TCARE_SERVER: z.string().default('http://localhost:4000'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  API_TIMEOUT: z.string().transform(Number).default('30000')
});

// Parse and validate env variables
export const config = envSchema.parse(process.env);

// Export typed config
export default {
  port: config.PORT,
  nodeEnv: config.NODE_ENV,
  isProduction: config.NODE_ENV === 'production',
  isDevelopment: config.NODE_ENV === 'development',
  isTest: config.NODE_ENV === 'test',
  logLevel: config.LOG_LEVEL,
  apiTimeout: config.API_TIMEOUT,
  tcare_server: config.TCARE_SERVER
};
