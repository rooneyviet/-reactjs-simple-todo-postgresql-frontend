

import {PayloadAction, createSlice} from "@reduxjs/toolkit";


export const stateSlice = createSlice({
    name: "State",
    initialState: {
        appState: ""
    },
    reducers: {
        setAppState: (state, action: PayloadAction<string>)=> {
            state.appState = action.payload;
        
        },
        
    
    }
});

export const {
    setAppState
} = stateSlice.actions;

export default stateSlice;