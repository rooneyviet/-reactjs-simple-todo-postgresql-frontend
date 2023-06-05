import axios from "axios";
import apiClient from "../client/api.client";
import { ILogin } from "../../model/ILogin";
import { ITodo } from "../../model/ITodo";
import { StringLiteral } from "typescript";



const todoEndpoint = {
    getAllTodos: "todos/",
    newTodo: "todos/newtodo",
    deleteTodo: (todoId: string) => `todos/${todoId}`,
    updateTodo: (todoId: string) => `todos/${todoId}`
}

interface DeleteTodoProps{
    todoId: string;
};

interface UpdateTodoProps{
    todoId: string;
    title?: string;
    content?: String;
    isDone?: boolean;
    categoryId?: string
};

interface NewTodoProps{
    title?: string;
    content?: String;
    isDone?: boolean;
    categoryId?: string
};



const todoAPI = {
    getAllTodos: async ()  => {
        try {
            const response = await apiClient.get<ITodo[]>(
                todoEndpoint.getAllTodos
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
    deleteTodo: async ({todoId}: DeleteTodoProps)  => {
        try {
            const response = await apiClient.delete(
                todoEndpoint.deleteTodo(todoId)
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
    updateTodo: async ({todoId, title, content, isDone, categoryId}: UpdateTodoProps)  => {
        try {
            const response = await apiClient.patch<ITodo>(
                todoEndpoint.updateTodo(todoId),
                {title, content, isDone, categoryId}
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
    newTodo: async ({title, content, isDone, categoryId}: NewTodoProps)  => {
        try {
            const response = await apiClient.post<ITodo>(
                todoEndpoint.newTodo,
                {title, content, isDone, categoryId}
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
    
}

export default todoAPI;