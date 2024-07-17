import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,UseInterceptors,ClassSerializerInterceptor
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";
import { UpdateUser } from "./dtos/update-user.dto";

@Controller("auth")
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post("/signup")
  createUser(@Body() body: CreateUserDto) {
    this.userService.create(
      body.id,
      body.firstName,
      body.lastName,
      body.email,
      body.isActive,
      body.password
    );
  }

  // @UseInterceptors(ClassSerializerInterceptor)//excluding password property in getting response||not required as going to implement interceptor
  async findUser(@Param("id") id: string) {
    const user = await this.userService.findOne(parseInt(id));
    if(!user){
      throw new NotFoundException("User Not found sir")
    }
    return user;
  }

  // @UseInterceptors(ClassSerializerInterceptor)//excluding password property in getting response||not required as going to implement interceptor
  @Get()
  async findAllUsers(@Query("email") email: string) {
    const user = await this.userService.find(email);
    if(!user){
      throw new NotFoundException("Data is not found!")
    }
    return user;
  }

  @Delete("/:id")
  removeUser(@Param("id") id: string) {
    return this.userService.remove(parseInt(id));
  }

  @Patch("/:id")
  updateUser(@Param("id") id: string, @Body() body: UpdateUser) {
    return this.userService.update(parseInt(id),body);
  }
}
