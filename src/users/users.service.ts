import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./users.entity";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  create(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    isActive: boolean,
    password: string
  ) {
    const user = this.repo.create({
      id,
      firstName,
      lastName,
      email,
      isActive,
      password,
    });
    return this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOne({where :{id}});
  }

  find(email: string) {
    return this.repo.find({where: {email} });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException("User not find");
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id:number){
    const user =await this.findOne(id);
    if(!user){
      throw new NotFoundException("User not found");
    }
    this.repo.remove(user);

  }
}
