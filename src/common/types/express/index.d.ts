import { JwtPayload } from 'src/modules/auth/auth.dto';

declare module 'express' {
  export interface Request {
    user?: JwtPayload;
  }
}
