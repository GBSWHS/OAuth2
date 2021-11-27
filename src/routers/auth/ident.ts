import express from 'express'
import db from '../../utils/db'
import redis from '../../utils/redis'
import { Code, User } from '../../types'

const router = express.Router()

router.post('/ident', async (req, res) => {
  const { 
    code,
    client_id,
    client_secret,
    redirect_uri,
    grant_type 
  } = req.body

  if (!code) {
    return res.status(400).send({
      error: 'invalid_request',
      error_description: 'Missing code'
    })
  }

  if (!client_id) {
    return res.status(400).send({
      error: 'invalid_request',
      error_description: 'Missing client_id'
    })
  }

  if (!client_secret) {
    return res.status(400).send({
      error: 'invalid_request',
      error_description: 'Missing client_secret'
    })
  }

  if (!redirect_uri) {
    return res.status(400).send({
      error: 'invalid_request',
      error_description: 'Missing redirect_uri'
    })
  }

  if (grant_type !== 'authorization_code') {
    return res.status(400).send({
      error: 'invalid_request',
      error_description: 'Missing grant_type'
    })
  }

  const token = JSON.parse(await redis.get(code) as string) as Code
  const exist = await db('users').where({ user_ident: token.userid }).first()
  if (!exist) {
    return res.status(400).send({
      error: 'invalid_request',
      error_description: 'User not found'
    })
  }

  const user = exist.student_id 
    ? await db('users').where({ user_ident: token.userid })
      .leftJoin('students', 'users.student_id', 'students.student_id').first() as User
    : await db('users').where({ user_ident: token.userid }).first() as User

  return res.status(200).json({
    success: true,
    user: {
      id: user.user_ident,
      sid: user.student_id!,
      name: user.user_realname,
      gender: user.user_gender,
      nickname: user.user_nickname,
      email: user.user_email,
      student: {
        grade: user.student_grade,
        class: user.student_class,
        number: user.student_number,
        phone: user.student_phone,
        room: user.student_room
      }
    }
  })
})

export default router
