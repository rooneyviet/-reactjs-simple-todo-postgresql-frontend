import React from 'react'
import { Outlet} from "react-router-dom"
import { Box } from '@mui/material'
import { useSelector } from 'react-redux';
import { RootState } from './redux/rootReducer';
import AddCategoryModal from './components/AddCategoryModal/AddCategoryModal';
import AddTask from './components/AddTask/AddTask';
import AddModal from './components/AddModal/AddModal';
import UpdateTodoModal from './components/UpdateTodoModal/UpdateTodoModal';

const MainLayout = () => {

  const { isShowCategoryTodoModal, isShowAddTodoModal, updatingTodo } = useSelector((state: RootState) => state.openModal);

  return (
    <>

        <Box display="flex" minHeight="100vh">
        {isShowCategoryTodoModal && <AddCategoryModal/>}
        {isShowAddTodoModal && <AddModal/>}
        {updatingTodo!==null && <UpdateTodoModal/> }
        <Box
          component="main"
          flexGrow={1}
          overflow="hidden"
          minHeight="100vh"
        >
          <Outlet />
        </Box>
      </Box>
    </>
  )
}

export default MainLayout