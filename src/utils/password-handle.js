import crypto from 'crypto'

const md5password = (password) => {
  return crypto.createHash('md5').update(password).digest('hex')
}

export {md5password}