import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LogDto } from './log.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.getUserByEmail(email);
    if(!user) throw new UnauthorizedException('User does not exist');

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const payload = { id: user.id, email: user.email, isAdmin: user.isAdmin };
      return await this.jwtService.signAsync(payload);
    } else {
      throw new UnauthorizedException('Incorrect password');
    }
  }

  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if(!user) throw new NotFoundException('User does not exist');
    return user;
}
}
