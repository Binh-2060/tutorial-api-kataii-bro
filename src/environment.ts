import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(__dirname, '..', '.env') })

const environment = {
  node_env: process.env.NODE_ENV ?? 'development',
  app_domain: process.env.APP_DOMAIN,
  app_id: process.env.APP_ID,
  api_version: process.env.API_VERSION,
  port: process.env.PORT,
  token_expire: process.env.TOKEN_EXPIRE_IN,
  db_host: process.env.DB_HOST,
  db_port: process.env.DB_PORT,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  db_schema: process.env.DB_SCHEMA,
  encryption_key: process.env.ENCRYPTION_KEY,
  privateKey: process.env.PRIVATE_KEY,
  publicKey: process.env.PUBLIC_KEY,
}

export default environment
