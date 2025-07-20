import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Determine the path to the .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../.env');

// Load environment variables
dotenv.config({ path: envPath });
