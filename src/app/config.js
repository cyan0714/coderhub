import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

dotenv.config();
const __dirname = path.resolve() + '\\src\\app'

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'));

export const envVar = process.env
export {PRIVATE_KEY, PUBLIC_KEY}