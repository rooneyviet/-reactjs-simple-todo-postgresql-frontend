import React, { useEffect, useState } from "react";
import * as S from "./styles";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { setUpdateTodoInModal, showAddTodoModal } from "../../redux/features/openModalSlice";
import todoAPI from "../../api/service/todo.api";
import { createNewTodo } from "../../redux/features/todoSlice";
import { ITodo } from "../../model/ITodo";
import { Modal } from "@mui/material";

type CategorySelectOptionType = { label: string; id: string };

interface UpdateTodoModalProps {
  iTodo: ITodo;
}

const UpdateTodoModal = () => {
  const dispatch = useDispatch();
  const { categoriesList } = useSelector((state: RootState) => state.category);
  const { updatingTodo } = useSelector((state: RootState) => state.openModal);
  const [todoName, setTodoName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [selectedCategoryPos, setSelectedCategoryPos] = useState(0);

  
  function handleTyping(event: React.ChangeEvent<HTMLInputElement>) {
    setTodoName(event.target.value);
  }

  function handleCancel() {
    dispatch(setUpdateTodoInModal(null))
  }

  const handleUpdate = async () => {
    try {
      const { response, err } = await todoAPI.updateTodo({
        todoId: updatingTodo?.id || "",
        title: todoName,
        content: "DUMMY",
        isDone: updatingTodo?.isDone || false,
        categoryId: categoryId,
      });
      if (err) {
        console.log(err);
      }

      if (response) {
        dispatch(createNewTodo(response.data));
        dispatch(showAddTodoModal(false));
      }
    } catch (err) {
      console.log("error fetching todos " + err);
    }
  };

  const selectCategoriesOptions: Array<CategorySelectOptionType> =
    categoriesList.map((eachCategory) => {
      return { label: eachCategory.title, id: eachCategory.id };
    });

  const categoryIdListOption: Array<string> = categoriesList.map(
    (eachOption) => {
      return eachOption.id || "";
    }
  );

  var selctedInd = categoryIdListOption.indexOf(categoryId);
  useEffect(()=>{
		setTodoName(updatingTodo?.title || "");
    setCategoryId(updatingTodo?.categoryId || "");
    setSelectedCategoryPos(selctedInd);
	}, [])
  

  const handleSelectionChange = (option: CategorySelectOptionType | null) => {
    if (option) {
      setCategoryId(option.id);
    }
  };

  return (
    <Modal open={updatingTodo!== null} onClose={()=> dispatch(setUpdateTodoInModal(null))}
    style={{display:'flex',alignItems:'center',justifyContent:'center'}}
      >
      <S.Container>
        <S.Text>Insert name</S.Text>
        <S.TitleInput
          placeholder="Task name"
          onChange={handleTyping}
          value={todoName}
        />
        <S.Text>Select a categorie</S.Text>
        
        <div style={{ width: "32vw" }}>
          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={selectCategoriesOptions[selectedCategoryPos]}
            isDisabled={false}
            isClearable={false}
            isSearchable={false}
            name="color"
            onChange={handleSelectionChange}
            options={selectCategoriesOptions}
          />
        </div>

        <S.Buttons>
          <S.CancelButton onClick={handleCancel}>Cancel</S.CancelButton>
          <S.DeletButton onClick={handleUpdate}>Update</S.DeletButton>
        </S.Buttons>
      </S.Container>
    </Modal>
  );
};

export default UpdateTodoModal;
