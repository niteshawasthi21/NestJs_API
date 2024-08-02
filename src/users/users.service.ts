import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  /**
   * Create a new user.
   * @param firstName - The user's first name.
   * @param confirmPassword - The password confirmation.
   * @param email - The user's email address.
   * @param password - The user's password.
   * @returns The saved user entity.
   * @throws ConflictException if passwords do not match or email is already in use.
   */
  async create( fullName: string, confirmPassword: string, email: string, password: string) {
    // Check if passwords match
    if (password !== confirmPassword) {
      throw new ConflictException('Passwords do not match');
    }

    // Check if email is already in use
    const existingUser = await this.repo.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.repo.create({
      fullName,
      email,
      password: hashedPassword, // Store hashed password
    });

    return this.repo.save(user);
  }

  /**
   * Find a user by email address.
   * @param email - The email address to search for.
   * @returns The user entity or null if not found.
   */
  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  /**
   * Authenticate a user by email and password.
   * @param email - The user's email address.
   * @param password - The user's password.
   * @returns A success message with the user ID if credentials are valid.
   * @throws UnauthorizedException if the credentials are invalid.
   */
  async login(email: string, password: string) {
    const user = await this.findByEmail(email);    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!user || !isPasswordValid) {
      throw new ConflictException('Invalid credentials');
    }

    return { message: 'Login successful', userId: user.id };
  }

  /**
   * Find a user by their ID.
   * @param id - The user's ID.
   * @returns The user entity.
   * @throws NotFoundException if the user is not found.
   */
  async findOne(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  /**
   * Find users by email address.
   * @param email - The email address to search for.
   * @returns An array of user entities.
   */
  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  /**
   * Update a user with new attributes.
   * @param id - The user's ID.
   * @param attrs - The attributes to update.
   * @returns The updated user entity.
   * @throws NotFoundException if the user is not found.
   */
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // If updating the password, hash it
    if (attrs.password) {
      attrs.password = await bcrypt.hash(attrs.password, 10);
    }

    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  /**
   * Remove a user by ID.
   * @param id - The user's ID.
   * @returns The removed user entity.
   * @throws NotFoundException if the user is not found.
   */
  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.repo.remove(user);
  }
}
