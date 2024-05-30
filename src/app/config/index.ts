import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

if (!process.env.PORT || !process.env.DATABASE_URI) {
  console.error('Environment variables not set correctly');
  process.exit(1);
}




export default {
  port: process.env.PORT,
  database_uri: process.env.DATABASE_URI,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  default_password: process.env.DEFAULT_PASSWORD
};
