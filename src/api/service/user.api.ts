import axios from "axios";
import apiClient from "../client/api.client";
import { ILogin } from "../../model/ILogin";



const userEndpoint = {
    signin: "auth/login",
    signup: "auth/register",
}


interface LoginEntityProps {
    username: string,
    password: string
}



interface RegisterEntityProps {
    username: string,
    password: string,
    passwordConfirm: string, 
}

const userAPI = {
    signin: async ({username, password}: LoginEntityProps)  => {
        try {
            const response = await apiClient.post<ILogin>(
                userEndpoint.signin,{username, password}
            );
            //console.log(response.data);
            return {response};
        } catch (err) {
            console.log(err);
            if (axios.isAxiosError(err) && err.response)  {
                console.log(err);
                console.log(err.response);
                return {err:String(err?.response)};
              } else {
                return {err:"Something wrong?"};
              }
        }
    },
    signup: async ({username, password, passwordConfirm} : RegisterEntityProps) => {
        try {
            const response = await apiClient.post(
                userEndpoint.signup,
                {username, password, passwordConfirm}
            );

            console.log(response);
            console.log(response.data);

            return {response};
        } catch (err) {
            console.log(err);
            if (axios.isAxiosError(err) && err.response)  {
                console.log(err);
                console.log(err.response);
                return {err:String(err?.response?.data)};
              } else {
                return {err:"Something wrong?"};
              }
        }
    },
    
}

export default userAPI;