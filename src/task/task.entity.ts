import { 
  AfterInsert, 
  AfterRemove, 
  AfterUpdate, 
  Entity, 
  Column, 
  PrimaryGeneratedColumn 
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number; // Auto-incremented unique identifier for the task

  @Column()
  title: string; // Title of the task

  @Column()
  description?: string; // Optional description of the task   

  @Column({ default: 'pending' })
  status:  string// Status of the task

  /**
   * Logs a message when a new task is inserted into the database.
   */
  @AfterInsert()
  logInsert() {
    console.log('Inserted Task', this.id);
  }

  /**
   * Logs a message when a task is updated in the database.
   */
  @AfterUpdate()
  logUpdate() {
    console.log('Updated Task', this.id);
  }

  /**
   * Logs a message when a task is removed from the database.
   */
  @AfterRemove()
  logRemove() {
    console.log('Removed Task', this.id);
  }
}
