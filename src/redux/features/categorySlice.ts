import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICategory } from "../../model/ICategory";

export const categorySlice = createSlice({
  name: "Category",
  initialState: {
    categoriesList: [] as ICategory[],
    selectedCategoryId: "",
  },
  reducers: {
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categoriesList = action.payload;
    },
    createNewCategory: (state, action: PayloadAction<ICategory>) => {
      state.categoriesList = [action.payload, ...state.categoriesList];
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categoriesList = [...state.categoriesList].filter(
        (e) => e.id.toString() !== action.payload
      );
    },
    updateTodoItem: (state, action: PayloadAction<ICategory>) => {
      const objIndex = state.categoriesList.findIndex(
        (obj) => action.payload.id === obj.id
      );
      state.categoriesList[objIndex] = action.payload;
    },
  },
});

export const {
  setCategories,
  createNewCategory,
  removeCategory,
  updateTodoItem,
} = categorySlice.actions;

export default categorySlice;
