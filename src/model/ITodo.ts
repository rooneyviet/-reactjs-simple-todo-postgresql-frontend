import {ICategory} from "./ICategory";
import {IUser} from "./IUser";

export type ITodo= {
    id: string,
    created_at: string,
    updated_at: string,
    title: string, 
    content: string, 
    isDone: boolean,
    userId: string,
    categoryId?: string,
    user: IUser,
    category?: ICategory
}