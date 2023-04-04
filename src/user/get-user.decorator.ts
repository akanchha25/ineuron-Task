import { createParamDecorator } from "@nestjs/common";
import { User } from "./entities/user.entity";

export const GetUser =  createParamDecorator(async( data, req ): Promise<User> => {
    
    return await req.args[0].user;
});

 