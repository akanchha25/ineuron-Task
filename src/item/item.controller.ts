import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { GetUser } from "src/user/get-user.decorator";
import { ItemDto } from "./item.dto";
import { ItemService } from "./item.service";

@Controller('/users/items')
export class ItemController {
    constructor(
        private  itemService: ItemService
    ){}

    @Post('/additems')
    async addItems(
        @GetUser() user,
        @Body(ValidationPipe) itemDto: ItemDto): Promise<any>{

            console.log(user);
       return await this.itemService.addItems(user, itemDto);
    }
}