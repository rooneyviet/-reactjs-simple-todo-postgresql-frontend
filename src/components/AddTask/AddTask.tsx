import React, { useContext } from "react";
import * as S from "./styles";
import Add from "../../images/add.svg";
import { useDispatch } from "react-redux";
import { showAddTodoModal } from "../../redux/features/openModalSlice";

const AddTask = () => {
    const dispatch = useDispatch();
    function handleClick(){
        dispatch(showAddTodoModal(true));
    };

    return(
        <S.Container onClick={handleClick}>
            <S.Icon src={Add}/>
            <S.Text>Add a task</S.Text>
        </S.Container> 
    );
}

export default AddTask