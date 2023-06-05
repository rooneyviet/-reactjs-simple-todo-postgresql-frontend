import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import { ITodo } from "../../model/ITodo";


export const openModalSlice = createSlice({
    name: "OpenModal",
    initialState: {
        isShowAddTodoModal: false,
        isShowCategoryTodoModal: false,
        //isShowUpdateTodoModal: false,
        updatingTodo: null as ITodo | null,
        //isShowAddTodoModal: false
    },
    reducers: {
        showAddTodoModal: (state, action: PayloadAction<boolean>)=> {
            state.isShowAddTodoModal = action.payload;
        
        },
        showAddCategoryModal: (state, action: PayloadAction<boolean>)=> {
            state.isShowCategoryTodoModal = action.payload;
    
        },
        //showUpdateTodoModal: (state, action: PayloadAction<boolean>)=> {
            //state.isShowUpdateTodoModal = action.payload;
    
        //},
        setUpdateTodoInModal: (state, action: PayloadAction<ITodo | null>)=> {
            state.updatingTodo = action.payload;
        },
    
    }
});

export const {
    showAddTodoModal,
    showAddCategoryModal,
    setUpdateTodoInModal
} = openModalSlice.actions;

export default openModalSlice;