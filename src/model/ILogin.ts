import { IUser } from "./IUser";

export type ILogin= {
    accessToken: string,
    refreshToken: string,
    user: IUser,
}