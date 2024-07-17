export declare class User {
    id: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    isActive?: boolean;
    password?: string;
    logInsert(): void;
    logUpdate(): void;
    logRemove(): void;
}
