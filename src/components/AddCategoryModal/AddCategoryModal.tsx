import React, { useState } from "react";
import * as S from "./styles";
import Select, { StylesConfig } from "react-select";
import { useDispatch } from "react-redux";
import categoryAPI from "../../api/service/category.api";
import { showAddCategoryModal } from "../../redux/features/openModalSlice";
import { createNewCategory } from "../../redux/features/categorySlice";

type ColorSelectOptionType = { label: string; value: string };

const AddCategoryModal = () => {
  const dispatch = useDispatch();
  const colorOptions: Array<ColorSelectOptionType> = [
    { label: "white", value: "#ffffff" },
    { label: "black", value: "#000000" },
    { label: "red", value: "#ff0000" },
    { label: "blue", value: "#0000ff" },
    { label: "yellow", value: "#FFFF00" },
    { label: "orange", value: "#ffa500" },
    { label: "green", value: "#00ff00" },
  ];

  const [categoryName, setCategoryName] = useState("");
  const [colorOption, setColorOption] = useState(colorOptions[0]);

  const handleSelectionChange = (option: ColorSelectOptionType | null) => {
    if (option) {
      setColorOption(option);
    }
  };

  function handleTyping(event: React.ChangeEvent<HTMLInputElement>) {
    setCategoryName(event.target.value);
  }

  function handleCancel() {
    dispatch(showAddCategoryModal(false));
  }

  const handleAddCategory = async () => {
    try {
      const { response, err } = await categoryAPI.newCategory({
        title: categoryName,
        color: colorOption.value,
      });
      if (err) {
        console.log(err);
      }

      if (response) {
        dispatch(createNewCategory(response.data))
        dispatch(showAddCategoryModal(false));
      }

    } catch (err) {
      console.log("error fetching todos " + err);
    }
  };
  return (
    <S.Background>
      <S.Container>
        <S.Text>Category Name</S.Text>
        <S.TitleInput
          placeholder="Category name"
          onChange={handleTyping}
          value={categoryName}
        />
        <S.Text>Select a color</S.Text>
        {/* <S.Select id="select" onChange={handleChange}>
                    {categList.map((cat)=><option value={cat.id}>{cat.name}</option>)}
                </S.Select> */}
        <div style={{ width: "32vw" }}>
          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={colorOptions[0]}
            isDisabled={false}
            isClearable={false}
            isSearchable={false}
            onChange={handleSelectionChange}
            name="color"
            options={colorOptions}
          />
        </div>

        <S.Buttons>
          <S.CancelButton onClick={handleCancel}>Cancel</S.CancelButton>
          <S.DeletButton onClick={handleAddCategory}>Add</S.DeletButton>
        </S.Buttons>
      </S.Container>
    </S.Background>
  );
};

export default AddCategoryModal;
