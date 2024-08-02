import { 
  AfterInsert, 
  AfterRemove, 
  AfterUpdate, 
  Entity, 
  Column, 
  PrimaryGeneratedColumn 
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number; // Auto-incremented unique identifier for the user

  @Column()
  fullName: string; // User's first name

  @Column({ unique: true })
  email: string; // User's email address, must be unique

  @Column({ default: true })
  isActive: boolean; // User's active status, default is true

  @Column()
  password: string; // User's password (hashed)

  /**
   * Logs a message when a new user is inserted into the database.
   */
  @AfterInsert()
  logInsert() {
    console.log('Inserted User', this.id);
  }

  /**
   * Logs a message when a user is updated in the database.
   */
  @AfterUpdate()
  logUpdate() {
    console.log('Updated User', this.id);
  }

  /**
   * Logs a message when a user is removed from the database.
   */
  @AfterRemove()
  logRemove() {
    console.log('Removed User', this.id);
  }
}
