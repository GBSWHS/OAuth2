import express from 'express'
const router = express.Router()

import login from './auth/login'
import ident from './auth/ident'
import clogin from './client/login'

router.use('/api', ident)
router.use('/internal', login)
router.use('/internal', clogin)

export default router