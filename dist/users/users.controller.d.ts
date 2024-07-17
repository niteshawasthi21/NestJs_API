import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";
import { UpdateUser } from "./dtos/update-user.dto";
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    createUser(body: CreateUserDto): void;
    findUser(id: string): Promise<any>;
    findAllUsers(email: string): Promise<any>;
    removeUser(id: string): Promise<void>;
    updateUser(id: string, body: UpdateUser): Promise<any>;
}
