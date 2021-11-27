import express from 'express'
import db from '../../utils/db'
import { verify } from 'jsonwebtoken'
import client from '../../utils/redis'
import { Application, Code, Token, User } from '../../types'

const router = express.Router()

router.post('/check', async (req, res) => {
  const {
    id,
    state,
    redirect_uri,
    responsetype
  } = req.body
  const token = req.headers.authorization

  if (!id) {
    return res.status(400).json({
      error: 'invalid_request',
      error_description: 'id is required'
    })
  }

  if (!redirect_uri) {
    return res.status(400).json({
      error: 'invalid_request',
      error_description: 'redirect_uri is required'
    })
  }

  if (!responsetype) {
    return res.status(400).json({
      error: 'invalid_request',
      error_description: 'responsetype is required'
    })
  }

  if (responsetype !== 'code') {
    return res.status(400).json({
      error: 'invalid_request',
      error_description: 'responsetype must be code'
    })
  }

  if (!token) {
    return res.status(405).json({
      error: 'invalid_request',
      error_description: 'token is required'
    })
  }


  try {
    const decoded = verify(token, process.env.JWT_SECRE as string) as Token
    const user = await db('users').where({ user_ident: decoded.id }).first() as User
    const app = await db('applications').where({ app_id: id }).first() as Application

    if (!app) {
      return res.status(404).json({
        error: 'invalid_request',
        error_description: 'app is not found'
      })
    }

    const code = ranStr(16)
    const payload = {
      userid: user.user_ident,
      redirecturi: redirect_uri
    } as Code

    await client.set(code, JSON.stringify(payload), {
      EX: 1000 * 60
    })

    const states = state
      ? '&state=' + state
      : '&state='
      

    return res.status(200).json({
      message: 'success',
      redirect:  app.app_redirect + "?code=" + code + states
    })
  } catch (e: unknown) {
    return res.status(500).json({
      error: 'server_error',
      error_description: 'server error'
    })
  }
})

function ranStr(length: number) {
  let result = '';
  const characters = 
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let charactersLength = characters.length
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}


export default router