// import { Exclude } from 'class-transformer';
import {AfterInsert,AfterRemove,AfterUpdate, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName?: string;

  @Column()
  lastName?: string;

  @Column()
  email?: string;

  @Column({ default: true })
  isActive?: boolean;

  // @Exclude() //excluding password property to getting in response!||not required as going to implement interceptor
  @Column()
  password?: string;

  @AfterInsert()
  logInsert(){
    console.log("Inserted User",this.id)
  }
  @AfterUpdate()
  logUpdate(){
    console.log("Updated User",this.id)
  }

  @AfterRemove()
  logRemove(){
    console.log("Removed User",this.id)
  }
}
