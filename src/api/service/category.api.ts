import axios from "axios";
import { ICategory } from "../../model/ICategory";
import apiClient from "../client/api.client";

const categoryEndpoint = {
    getAllCategories: "categories/",
    newcategory: "categories/newcategory",
    getCategory: (categoryId: string) => `categories/${categoryId}`,
    deleteCategory: (categoryId: string) => `categories/${categoryId}`,
    updateCategory: (categoryId: string) => `todos/${categoryId}`
}

interface DeleteCategoryProps{
    categoryId: string;
};

interface UpdateCategoryProps{
    categoryId: string;
    title: string;
    color: String;
};

interface NewCategoryProps{
    title: string;
    color: String;
};

const categoryAPI = {
    getAllCategories: async ()  => {
        try {
            const response = await apiClient.get<ICategory[]>(
                categoryEndpoint.getAllCategories
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
    deleteCategory: async ({categoryId}: DeleteCategoryProps)  => {
        try {
            const response = await apiClient.delete(
                categoryEndpoint.deleteCategory(categoryId)
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
    updateCategory: async ({categoryId, title, color}: UpdateCategoryProps)  => {
        try {
            const response = await apiClient.patch<ICategory>(
                categoryEndpoint.updateCategory(categoryId),
                {title, color}
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
    newCategory: async ({title, color}: NewCategoryProps)  => {
        try {
            const response = await apiClient.post<ICategory>(
                categoryEndpoint.newcategory,
                {title, color}
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

export default categoryAPI;