import React, { useState } from "react";
import * as S from "./styles";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { showAddTodoModal } from "../../redux/features/openModalSlice";
import todoAPI from "../../api/service/todo.api";
import { createNewTodo } from "../../redux/features/todoSlice";

type CategorySelectOptionType = { label: string; id: string };

const AddModal = () => {
  const dispatch = useDispatch();
  const { categoriesList } = useSelector((state: RootState) => state.category);
  const [todoName, setTodoName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  //const [taskCat, setTaskCat] = useState(categList.findIndex((cat)=>cat.name == "None"));

  function handleTyping(event: React.ChangeEvent<HTMLInputElement>) {
    setTodoName(event.target.value);
  }

  function handleCancel() {
    dispatch(showAddTodoModal(false));
  }


  const handleAdd = async () => {
    try {
      const { response, err } = await todoAPI.newTodo({
        title: todoName,
        content: "DUMMY",
        isDone: false,
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

  function handleChange() {
    //setTaskCat(Number(e.options[(e.selectedIndex)].value));
  }

  const selectCategoriesOptions: Array<CategorySelectOptionType> =
    categoriesList.map((eachCategory) => {
      return { label: eachCategory.title, id: eachCategory.id };
    });

  const handleSelectionChange = (option: CategorySelectOptionType | null) => {
    if (option) {
      setCategoryId(option.id);
    }
  };

  return (
    <S.Background>
      <S.Container>
        <S.Text>Todo Name</S.Text>
        <S.TitleInput
          placeholder="Enter a todo name"
          onChange={handleTyping}
          value={todoName}
        />
        <S.Text>Select a categorie</S.Text>
        {/* <S.Select id="select" onChange={handleChange}>
                    {categList.map((cat)=><option value={cat.id}>{cat.name}</option>)}
                </S.Select> */}
        <div style={{ width: "32vw" }}>
          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={selectCategoriesOptions[1]}
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
          <S.DeletButton onClick={handleAdd}>Add</S.DeletButton>
        </S.Buttons>
      </S.Container>
    </S.Background>
  );
};

export default AddModal;
