import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  GetCredentialsDto,
  userAddressDetails,
  UserDto,
} from './data/user.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt/dist';
import { JwtPayLoad } from './jwt-payload.interface';
import { Users_address } from './entities/userAddress.entity';
//import { User } from "./data/user.model";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Users_address)
    private readonly addressRepository: Repository<Users_address>,

    private jwtServices: JwtService,
  ) {}

  async signUp(createUserDto: UserDto): Promise<any> {
    const { email_id, password, age, city } = createUserDto;

    const salt = await bcrypt.genSalt();

    const user: User = new User();
    user.email_id = email_id;
    user.salt = salt;
    user.password = await this.hashPassword(password, salt);
    user.age = age;
    user.city = city;

    try {
      const isExist = await this.userRepository.findOne({
        where: {
          email_id: createUserDto.email_id,
        },
      });

      if (isExist) {
        return { message: 'Email already exists' };
      } else {
        await this.userRepository.save(user);

        const newSignIn = this.signIn(createUserDto);

        // return { message: "Signed Up Successfully"}
        return newSignIn;
      }
    } catch (error) {
      throw new NotFoundException({ error: 'Bad Request' });
    }
  }

  async signIn(
    getCredentialsDto: GetCredentialsDto,
  ): Promise<{ accessToken: string }> {
    try {
      const { email_id, password } = getCredentialsDto;
      const user = await this.userRepository.findOne({
        where: {
          email_id: email_id,
        },
      });

      const validateUser = await user.validatePassword(password);

      if (validateUser) {
        const payload: JwtPayLoad = { email_id };
        const accessToken = await this.jwtServices.sign(payload);

        return { accessToken };
      } else {
        throw new UnauthorizedException('Invalid credentials');
      }
    } catch (error) {
      console.log(error);
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async userAddress(user: User, userAddress: userAddressDetails): Promise<any> {
    const { address, city, state, pincode } = userAddress;

    const newUserAddress = new Users_address();

    newUserAddress.address = address;
    newUserAddress.city = city;
    newUserAddress.state = state;
    newUserAddress.pincode = pincode;
    newUserAddress.user = user;

    await this.addressRepository.save(newUserAddress);

    // return {message: "user address added successfully"};
    // console.log(user.id);
    return newUserAddress.user;
  }

  async getDetails(user) {
    return this.addressRepository
      .createQueryBuilder('users_address')
      .innerJoinAndMapOne(
        'users_address.userId',
        User,
        'users',
        'users.id = users_address.userId',
      )
      .where('users.email_id= :email_id', { email_id: user.email_id })
      .getMany();
  }
}
