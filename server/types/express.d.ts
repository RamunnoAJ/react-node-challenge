import { SessionData } from 'express-session'
import { Request } from 'express'

declare module 'express-session' {
  interface SessionData {
    // Define properties of your session data here if needed
    errors: string[] | []
  }
}

declare module 'express-serve-static-core' {
  interface Request {
    session: SessionData
  }
}
