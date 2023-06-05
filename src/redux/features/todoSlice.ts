


import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import { ITodo } from "../../model/ITodo";



export const todoSlice = createSlice({
    name: "Todo",
    initialState: {
        todosList: [] as ITodo[],
        doneTodosList: [] as ITodo[],
        notDoneTodosList: [] as ITodo[],
        currentDisplayingList: 0 //0 = all, 1=done, 2=notdone
    },
    reducers: {
        setTodos: (state, action: PayloadAction<ITodo[]>)=> {
            state.todosList = action.payload;
            console.log("SetTodos slice $" + JSON.stringify(state.todosList));
            state.doneTodosList = [...state.todosList].filter(e => e.isDone)
            state.notDoneTodosList = [...state.todosList].filter(e => !(e.isDone))
        },
        createNewTodo: (state, action: PayloadAction<ITodo>)=> {
            state.todosList = [action.payload, ...state.todosList];
            state.notDoneTodosList = [action.payload, ...state.notDoneTodosList];

        },
        removeTodo: (state, action: PayloadAction<string>) => {
            state.todosList = [...state.todosList].filter(e => e.id.toString() !== action.payload)
            if(state.currentDisplayingList==1) {
                state.doneTodosList = [...state.doneTodosList].filter(e => e.isDone)    
            } 

            if(state.currentDisplayingList==2) {
                state.notDoneTodosList = [...state.notDoneTodosList].filter(e => !(e.isDone))
            } 
        },
        updateTodoItem: (state, action: PayloadAction<ITodo>) => {
            const objIndex = state.todosList.findIndex((obj => action.payload.id === obj.id));
            state.todosList[objIndex] = action.payload;
            state.doneTodosList = [...state.todosList].filter(e => e.isDone)
            state.notDoneTodosList = [...state.todosList].filter(e => !(e.isDone))
            
        },
        setCurrentDisplayingList: (state, action: PayloadAction<number>) => {
            state.currentDisplayingList = action.payload;
        },
    
    }
});

export const {
    setTodos,
    createNewTodo,
    removeTodo,
    updateTodoItem,
    setCurrentDisplayingList
} = todoSlice.actions;

export default todoSlice;