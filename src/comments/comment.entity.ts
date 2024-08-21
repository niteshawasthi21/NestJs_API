import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  historyId: number;

  @Column()
  comment: string;

  @Column({ default: false })
  isPosted?: boolean;
}
