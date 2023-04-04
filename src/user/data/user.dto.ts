import { IsString, IsInt, IsNotEmpty, MinLength, MaxLength, Matches, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class UserDto {
    
   @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    email_id: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    { message: "password too week" })
    password: string;

    @ApiProperty()
    @IsInt()
    age: number;

    @ApiProperty()
    @IsString()
    city: string;
    


}

 export class GetCredentialsDto {
    
    @ApiProperty()
    @IsNotEmpty()
    email_id : string;
    
    @ApiProperty()
    @IsNotEmpty()
    password : string;


 }

 export class userAddressDetails {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    address: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    city: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    state: string;
 
    @ApiProperty()  
    @IsNotEmpty()
    @IsNumber()
    pincode: number;
  
  }
  
  
  