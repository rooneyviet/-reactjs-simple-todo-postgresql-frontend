import { combineReducers } from '@reduxjs/toolkit'
import todoSlice from './features/todoSlice'
import userSlice from './features/userSlice'
import openModalSlice from './features/openModalSlice'
import categorySlice from './features/categorySlice'

 
const rootReducer = combineReducers({
    todo: todoSlice.reducer,
    user: userSlice.reducer,
    openModal: openModalSlice.reducer,
    category: categorySlice.reducer
})
 
export type RootState = ReturnType<typeof rootReducer>
 
export default rootReducer