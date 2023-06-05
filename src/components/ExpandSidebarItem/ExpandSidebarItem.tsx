import React, { useEffect, useState } from "react";
import * as S from "./styles";
import CategorieItem from "../CategoryItem/CategoryItem";

import Arrow from "../../images/arrow.svg";
import Add from "../../images/add.svg";
import categoryAPI from "../../api/service/category.api";
import { ICategory } from "../../model/ICategory";
import { useDispatch, useSelector } from "react-redux";
import { showAddCategoryModal } from "../../redux/features/openModalSlice";
import { RootState } from "../../redux/rootReducer";
import { setCategories } from "../../redux/features/categorySlice";

interface SidebarItemProps {
  name: string;
  icon: string;
}

const ExpandSidebarItem = ({ name, icon }: SidebarItemProps) => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  
  //const [categoryList, setCategoryList] = useState([] as ICategory[]);

  const { categoriesList} = useSelector((state: RootState) => state.category);
  function handleActivate() {
    setActive(!active);
  }

  function handleClickAddNewCategory() {
    dispatch(showAddCategoryModal(true))
  }


  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const {response, err} = await categoryAPI.getAllCategories();
      if(err) {
        console.log(err);
      }

      if(response) {
        dispatch(setCategories(response.data))
        console.log(response);
      }
        
    
    } catch (err) {
      console.log("error fetching todos " + err);
    }
  };

  return (
    <S.OuterContainer isActive={active}>
      <S.Container isActive={active} onClick={handleActivate}>
        <S.Icon src={icon} />
        <S.Name>{name}</S.Name>
        <S.Arrow isActive={active} src={Arrow} />
      </S.Container>
      <S.CatArea isActive={active}>
        {categoriesList.map(cat=><CategorieItem name={cat.title} color={cat.color} />)}
        <S.AddArea onClick={handleClickAddNewCategory}>
          <S.AddIcon src={Add} />
          <S.AddText>Add new</S.AddText>
        </S.AddArea>
      </S.CatArea>
    </S.OuterContainer>
  );
};

export default ExpandSidebarItem;
