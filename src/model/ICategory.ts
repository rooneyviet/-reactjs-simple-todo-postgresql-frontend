import {IUser} from "./IUser";

export type ICategory = {
    id: string,
    created_at: string,
    updated_at: string,
    title: string, 
    color: string, 
    userId: string,
    user: IUser,
}