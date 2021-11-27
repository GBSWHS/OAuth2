import morgan from 'morgan'
import express from 'express'
import routers from '../routers'
import { createServer, Server } from 'http'

export default class App {
  private app = express() as express.Application
  private server = createServer(this.app) as Server
  private port = 8080 as number

  constructor({ port }: { port: number }) {
    this.port = port
    this.initlizeMiddlewares()
    this.initlizeRouters()
  }

  private initlizeMiddlewares() {
    this.app.use(morgan('common'))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  private initlizeRouters() {
    this.app.use('/', routers)
  }

  public listen() {
    this.server.listen(this.port, () => {
      console.info('Oauth2 backend server is now online, http://localhost:' + this.port)
    })
  }
}