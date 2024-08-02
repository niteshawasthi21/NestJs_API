import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUser } from './dtos/update-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  /**
   * Register a new user.
   * @param body - The user registration data.
   * @returns The newly created user.
   * @throws ConflictException if passwords do not match or email is already in use.
   */
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    try {
      return await this.userService.create(
        body.fullName,
        body.confirmPassword,
        body.email,
        body.password,
      );
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  /**
   * Authenticate a user.
   * @param body - The login credentials.
   * @returns A success message with the user ID if credentials are valid.
   * @throws UnauthorizedException if credentials are invalid.
   */
  @Post('/login')
  async login(@Body() body: { email: string; password: string }) {
    try {
      return await this.userService.login(body.email, body.password);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  /**
   * Find a user by ID.
   * @param id - The user's ID.
   * @returns The user entity.
   * @throws NotFoundException if the user is not found.
   */
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  /**
   * Find users by email address.
   * @param email - The email address to search for.
   * @returns An array of user entities.
   * @throws NotFoundException if no users are found.
   */
  @Get()
  async findAllUsers(@Query('email') email: string) {
    const users = await this.userService.find(email);
    if (users.length === 0) {
      throw new NotFoundException('No users found');
    }
    return users;
  }

  /**
   * Remove a user by ID.
   * @param id - The user's ID.
   * @returns The removed user entity.
   * @throws NotFoundException if the user is not found.
   */
  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    try {
      return await this.userService.remove(parseInt(id));
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  /**
   * Update a user by ID.
   * @param id - The user's ID.
   * @param body - The updated user data.
   * @returns The updated user entity.
   * @throws NotFoundException if the user is not found.
   */
  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUser) {
    try {
      return await this.userService.update(parseInt(id), body);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
