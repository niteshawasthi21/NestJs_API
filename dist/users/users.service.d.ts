import { Repository } from "typeorm";
import { User } from "./users.entity";
export declare class UsersService {
    private repo;
    constructor(repo: Repository<User>);
    create(id: number, firstName: string, lastName: string, email: string, isActive: boolean, password: string): any;
    findOne(id: number): any;
    find(email: string): any;
    update(id: number, attrs: Partial<User>): Promise<any>;
    remove(id: number): Promise<void>;
}
