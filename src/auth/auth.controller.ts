import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogDto } from './log.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from './public.decorator';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/loginUser')
  @ApiOkResponse({description: 'Login realizado com sucesso', type: LogDto, status: 200})
  @ApiOperation({summary: 'Recebe o token de login'})
  async signInUser(@Body() logDto: LogDto) {
      return this.authService.signIn(logDto.email, logDto.password);
  }

}
