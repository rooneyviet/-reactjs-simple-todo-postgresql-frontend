import React from 'react'
import * as S from "./styles";
import Edit from "../../images/edit.svg";
import Erase from "../../images/erase.svg";
import { ITodo } from '../../model/ITodo';
import todoAPI from '../../api/service/todo.api';
import { useDispatch } from 'react-redux';
import { removeTodo, updateTodoItem } from '../../redux/features/todoSlice';
import { setUpdateTodoInModal } from '../../redux/features/openModalSlice';


interface TaskCardProps{
    iTodo: ITodo
};


const TaskCard = ({iTodo}: TaskCardProps) => {
    const dispatch = useDispatch();


    
    const getTodos = async () => {
        try {
          const {response, err} = await todoAPI.getAllTodos();
          if(err) {
            console.log(err);
          }
    
          if(response) {
            //dispatch(setTodos(response.data))
            console.log(response);
          }
            
        
          //setTodos(newTempList);
        } catch (err) {
          console.log("error fetching todos " + err);
        }
      };


    const handleCheck = async (isDone: boolean) => {
        //const newIsDone = !isDone;
        try {
          const {response, err} = await todoAPI.updateTodo({todoId: iTodo.id, isDone: isDone});
          if(err) {
            
            console.log(err);
          }
    
          if(response) {
            console.log("handleCheckBox:");
            dispatch(updateTodoItem(response.data))
            console.log(response.data);
          }
            
        
          //setTodos(newTempList);
        } catch (err) {
          console.log("error fetching todos " + err);
        }
      };

      const handleDelete = async () => {
        try {
            const {response, err} = await todoAPI.deleteTodo({todoId: iTodo.id});

            if(response){
                console.log(response);
                dispatch(removeTodo(iTodo.id))
            }

            if(err){
                console.log(err);
            }
        } catch (error) {
            console.log("error fetching todos " + error);
        }
    }


    const handleEdit = () => {
      dispatch(setUpdateTodoInModal(iTodo));
    }


  return (
    <S.Container>
            <S.CheckField>
                <S.CheckboxRing onClick={()=> handleCheck(!iTodo.isDone)}><S.CheckFill done={iTodo.isDone}/></S.CheckboxRing>
            </S.CheckField>
            <S.Description>
                <S.Name done={iTodo.isDone}>{iTodo.title}</S.Name>
                <S.ListBelong>
                    <S.ColorTag color={iTodo.category?.color || "#FFFFFF"}/>
                    <S.ListName>{iTodo.category?.title || "All"}</S.ListName>
                </S.ListBelong>
            </S.Description>
            
            <S.Icon src={Edit} onClick={handleEdit}/><S.Icon src={Erase} onClick={handleDelete}/>
        </S.Container>
  )
}

export default TaskCard