import { SHA3 } from 'sha3'
import express from 'express'
import db from '../../utils/db'
const router = express.Router()
import { User } from '../../types'
import { sign } from 'jsonwebtoken'

const jwtPrivate = process.env.JWT_TOKEN || 'secret'

router.post('/login', async (req, res) => {
  const {
    id,
    passwd
  } = req.body

  if (!id || !passwd) {
    return res.status(400).send({
      error: 'invalid_request',
      error_description: 'id or passwd is empty'
    })
  }

  const user = await db('users').where({ user_id: id }).first() as unknown as User
  if (!user) return res.status(400).send({
    error: 'invalid_request',
    error_description: 'id or passwd is invalid'
  })

  if (user.user_password !== hash(passwd + user.user_salt)) {
    return res.status(400).send({
      error: 'invalid_request',
      error_description: 'id or passwd is invalid'
    })
  }

  const token = sign({ id: user.user_ident }, jwtPrivate, { expiresIn: '1h', algorithm: 'HS256' })
  res.send({
    success: true,
    token
  })
})

function hash(text: string) {
  const hasher = new SHA3(512)
  hasher.update(text)
  return hasher.digest('hex')
}

export default router
