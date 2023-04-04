import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  GetCredentialsDto,
  userAddressDetails,
  UserDto,
} from './data/user.dto';
import { User } from './entities/user.entity';
import { GetUser } from './get-user.decorator';
import { UserService } from './user.service';
import { ApiBody, ApiProperty, ApiSecurity, ApiTags } from "@nestjs/swagger";

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  create(@Body(ValidationPipe) createUserDto: UserDto): Promise<any> {
    return this.userService.signUp(createUserDto);
  }


  @ApiProperty({description: "this api is user login!"})
  @Post('/signin')
  signIn(
    @Body(ValidationPipe) getCredentialsDto: GetCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.signIn(getCredentialsDto);
  }

  @Get('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log(user);
    return user
  }

  @Post('/address')
  userAddress(
    @GetUser() user: User,
    @Body() add_addressDto: userAddressDetails,
  ): Promise<any> {
    return this.userService.userAddress(user, add_addressDto);
  }

  @Get('/myDetail')
  getMyDetail(@GetUser() user) {
    return this.userService.getDetails(user);
  }

  
  @Delete("/:id")
  deleteUser(@Param("id") id: string) :string{
      return this.userService.deleteUser(id);
  }

}
