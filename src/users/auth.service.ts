import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUP(fullName: string, confirmPassword: string, email: string, password: string ) {
    // Check if passwords match
    if (password !== confirmPassword) {
      throw new ConflictException("Passwords do not match");
    }

    // Check if email is already in use
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException("Email already in use");
    }

    //Hash the User Password
    //Genrate Salt
    const salt = randomBytes(8).toString("hex");

    //Hash the "Salt" and User "Password" together
    const hasSaltPasswrd = (await scrypt(password, salt, 32)) as Buffer;

    //Join the hash result and salt together
    const hashResult = salt + "." + hasSaltPasswrd.toString("hex");

    //Create a new User And save IT.
    const createUser = await this.userService.create(
      fullName,
      confirmPassword,
      email,
      hashResult
    );

    //Return the user
    return createUser;
  }

  async singIn(email: string, password: string) {
    //find the user
    const user = await this.userService.findByEmail(email);

    //Check user exist?
    if (!user) {
      throw new NotFoundException("User does not exist...");
    }

    //get user password
    const [salt, storedHash] = user.password.split(".");

    //crete has with user pasword
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //compre both hash password
    if (storedHash !== hash.toString("hex")) {
      throw new BadRequestException("Pasword is not correct");
    }
    return user; 
  }
}
