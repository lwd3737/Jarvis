import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Config } from '../config';

@Injectable()
export class AuthService {
  private firebaseApp: FirebaseApp;
  private auth: Auth;

  constructor(
    private configService: ConfigService<Config>,
    private jwtService: JwtService,
  ) {
    const firebaseConfig = configService.get('firebase', { infer: true })!;
    const firebaseApp = (this.firebaseApp = initializeApp(firebaseConfig));
    this.auth = getAuth(firebaseApp);
  }

  public async login(credential: {
    email: string;
    password: string;
  }): Promise<{ accessToken: string }> {
    try {
      const signInCredential = await signInWithEmailAndPassword(
        this.auth,
        credential.email,
        credential.password,
      );

      if (!signInCredential.user.email) {
        throw new UnauthorizedException('Email is null');
      }

      return {
        accessToken: await this.jwtService.signAsync({
          email: signInCredential.user.email,
        }),
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
